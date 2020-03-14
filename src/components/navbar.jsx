import React, { Component } from "react";
import "./navbar.css";

class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { selectAlgorithm } = this.props; //think i can delete this
    const dij = "dijkstra"; //and this?
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <nav className="navbar navbar-light bg-light">
        <a color="green" className="navbar-brand">
          Chess Pathfinder{" "}
        </a>

        <div id="dijkstraButton">
          <button
            onClick={() => this.props.onAlgorithm("Dijkstra")}
            className="btn btn-outline-success"
            type="button"
          >
            Dijkstra
          </button>
        </div>

        <button
          id="a*Button"
          onClick={() => this.props.onAlgorithm("A*")}
          className="btn btn-outline-success"
          type="button"
        >
          A*
        </button>

        <div className="dropdown" onClick={this.toggleOpen}>
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
          >
            Choose a piece:
          </button>
          <div className={menuClass} aria-labelledby="dropdownMenuButton">
            <a
              className="dropdown-item"
              onClick={() => this.props.onPiece("Rook")}
            >
              Rook
            </a>
            <a
              className="dropdown-item"
              onClick={() => this.props.onPiece("Bishop")}
            >
              Bishop
            </a>
            <a
              className="dropdown-item"
              onClick={() => this.props.onPiece("Queen")}
            >
              Queen
            </a>
            <a
              className="dropdown-item"
              onClick={() => this.props.onPiece("Horse")}
            >
              Horse
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
