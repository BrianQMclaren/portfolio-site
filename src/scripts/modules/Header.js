'use-strict';

class Header {
  constructor(config) {
    this.target = config.target;
  }

  run() {
    this.target.innerHTML = `
      <h2>
        Hello from ES2015
      </h2>
    `;
  }
}

export default Header;
