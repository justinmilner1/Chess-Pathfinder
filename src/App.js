import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import "./App.css";
import { dijkstra } from "./algorithms/dijkstra";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 }
    ],
    wallDensity: 0,
    walls: [],
    algoSpeed: 10,
    shortestPathSpeed: 20,
    algorithm: "Dijkstra",
    piece: "Rook"
  };

  selectAlgorithm = algo => {
    this.state.algorithm = algo;
    this.setState({ algo });
    console.log(this.state.algorithm);
  };

  selectPiece = p => {
    this.state.piece = p;
    this.setState({ p });
    console.log(this.state.piece);
  };

  handleIncrement = counter => {
    //updating counters
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    if (counters[index].value == 4) return;
    counters[index] = { ...counter };
    counters[index].value++;
    console.log(this.state.counters[0]);
    this.setState({ counters });

    //updating speed
    if (counter.id == 2) {
      const newSpeed = (this.state.algoSpeed -= 1);
      this.state.algoSpeed -= 1;
      this.state.shortestPathSpeed -= 2;
      this.setState({ newSpeed });
      return;
    }

    //updating wall density
    for (let i = 0; i < (this.state.wallDensity + 1) * 45; i++) {
      //45 is number of walls to toggle
      const row = Math.floor(Math.random() * 16);
      const col = Math.floor(Math.random() * 40);
      //dont allow row col to equal start or end node
      const pos = [row, col];
      this.state.walls.push(pos); //should be stored in 2d array
      this.PathfindingVisualizer.getNewGridWithWallToggledBase(row, col);
    }
  };

  handleDecrement = counter => {
    //updating counters
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    if (counters[index].value == 0) return;
    counters[index] = { ...counter };
    counters[index].value--;
    console.log(this.state.counters[0]);
    this.setState({ counters });

    //updating speed
    if (counter.id == 2) {
      const newSpeed = (this.state.algoSpeed += 1);
      this.state.algoSpeed += 1;
      this.state.shortestPathSpeed += 2;
      this.setState({ newSpeed });
      return;
    }

    //updating wall density
    if (this.state.walls.length < 45) return;

    for (let i = 0; i < 45; i++) {
      //45 is number of walls to toggle
      if (
        typeof this.state.walls[this.state.walls.length - 1][0] ==
          "undefined" ||
        typeof this.state.walls[this.state.walls.length - 1][1] == "undefined"
      ) {
        return;
      }

      this.PathfindingVisualizer.getNewGridWithWallToggledBase(
        index[0],
        index[1]
      );
    }
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  getSpeed = () => {
    return this.state.counters[0].value;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          onAlgorithm={this.selectAlgorithm}
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
          onPiece={this.selectPiece}
        />
        <div id="body">
          <main className="container">
            <Counters
              counters={this.state.counters}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          </main>
          <PathfindingVisualizer
            onRef={ref => (this.PathfindingVisualizer = ref)}
            onWallDensity={this.state.wallDensity}
            onAlgoSpeed={this.state.algoSpeed}
            onShortestPathSpeed={this.state.shortestPathSpeed}
            onAlgo={this.state.algorithm}
            onPiece2={this.state.piece}
          ></PathfindingVisualizer>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
