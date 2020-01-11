import React, { Component } from "react";

class Counter extends Component {
  render() {
    const { counter, onDelete, onDecrement, onIncrement } = this.props;

    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <a className="btn btn-primary btn-sm m-2">{this.getName()}</a>
        <button
          onClick={() => onIncrement(counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <button
          onClick={() => onDecrement(counter)}
          className="btn btn-secondary btn-sm m-2"
        >
          -
        </button>
      </div>
    );
  }

  getName() {
    var cars = ["Walls", "Speed"];
    return cars[this.props.counter.id - 1];
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    if (count === 5) return "5 (Maxx)";
    return count === 0 ? "0 (Min)" : count;
  }
}

export default Counter;
