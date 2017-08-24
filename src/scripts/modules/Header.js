'use-strict';

class Header {
  constructor(config) {
    this.target = config.target;
    this.header({ target: document.getElementsByTagName('header')[0] });
  }

  header() {
    this.target.innerHTML = `
    <header>
      <h1>Brian McLaren Portfolio</h1>
      <p>Front end web developer based in New York, NY</p>

      <nav>
        <ul>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    `;
  }
}

export default Header;
