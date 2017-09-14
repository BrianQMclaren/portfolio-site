import $ from 'jquery';
import fullpage from 'fullpage.js';

class revealOnScroll {
  constructor() {
    this.body = $('body');
    this.hideInitially();
    this.showInitially();
  }

  hideInitially() {
    this.body.removeClass('over');
  }

  showInitially() {
    this.body.addClass('over');
  }
}

$('#fullpage').fullpage({
  anchors: ['home', 'bio', 'qualifications', 'work', 'info'],
  sectionsColor: ['$primarycolor', '#fff', '#ebf5fe', '#f4f7fb', '#f6fbff'],

  autoScrolling: false,
  fitToSection: false,
  fixedElements: '.site-header',
  css3: true,

  onLeave(index, newIndex, direction) {
    if (index == 1) {
      this.showInitially;
    }
    if (index == 2 && direction == 'up') {
      this.hideInitially;
    }
  },
});

export default revealOnScroll;
