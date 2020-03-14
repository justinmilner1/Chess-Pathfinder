import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div class="wrapper">
        <div class="head">Pathfinder by Justin Milner</div>
        <footer class="next">
          <div>
            <a href="https://www.linkedin.com/in/justin-milner-b190467b/">
              LinkedIn
            </a>
          </div>
          <div>
            <a href="https://github.com/justinmilner1"> GitHub</a>
          </div>
          <div>
            <a href="https://rit.joinhandshake.com/users/20550279">Handshake</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
