import './styles.css';
import Header from './scripts/modules/Header';

new Header({
  target: document.getElementsByTagName('header')[0],
}).run();
