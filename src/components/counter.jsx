import React, { Component } from "react";

class Counter extends Component {
  render() {
    const { counter, onDelete, onDecrement, onIncrement } = this.props;

    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <a class="btn btn-success btn-sm mr-2">{this.getName()}</a>
        <button
          onClick={() => onIncrement(counter)}
          class="btn btn-success btn-sm mr-2"
        >
          +
        </button>
        <button
          onClick={() => onDecrement(counter)}
          class="btn btn-success btn-sm mr-2"
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
    let classes = "btn btn-success btn-sm mr-2";
    //classes += this.props.counter === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    if (count === 4) return "4 (Max)";
    return count === 0 ? "0 (Min)" : count;
  }
}

export default Counter;
