import boto3
from botocore.client import Config
import StringIO
import zipfile
import mimetypes


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic(
        'arn:aws:sns:us-east-1:467851996983:deployPortfolioTopic')

    location = {
        'bucketName': 'bqmclaren.build.com',
        'objectKey':  'portfoliobuild.zip'
    }

    try:
        job = event.get('CodePipeline.job')

        if job:
            for artifact in job['data']['inputArtifacts']:
                if artifact['name'] == 'MyAppBuild':
                    location = artifact['location']['s3Location']

        print 'Building portfolio from ' + str(location)

        s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))

        portfolio_bucket = s3.Bucket('bqmclaren.com')
        build_bucket = s3.Bucket(location['bucketName'])

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj(location['objectKey'], portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                mimetype = mimetypes.guess_type(nm)[0]
                if mimetype is None:
                    portfolio_bucket.upload_fileobj(
                        obj, nm)
                else:
                    portfolio_bucket.upload_fileobj(
                        obj, nm, ExtraArgs={'ContentType': mimetype})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        print ('Job Done!')
        topic.publish(Subject='Portfolio Deployed',
                      Message='Portfolio deployed successfully!')
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job['id'])
    except:
        topic.publish(Subject='Portfolio Deployment Failed',
                      Message='The portfolio was not deployed successfully!')
        raise
    return 'Hello from Lambda'
