import React, { Component } from "react";
import Node from "./Node.jsx";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { AStar2 } from "../algorithms/AStar2";
import "./PathfindingVisualizer.css";

const START_NODE_ROW = 8;
const START_NODE_COL = 8;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 32;

export default class PathfindingVisualizer extends Component {
  state = {
    wallDensity: this.props.onWallDensity,
    grid: [],
    mouseIsPressed: false
  };

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.props.onRef(this);
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    //this will be changed to animate in general
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.props.onAlgoSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, this.props.onAlgoSpeed * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, this.props.onShortestPathSpeed * i);
    }
  }

  visualizeAStar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const piece = this.props.onPiece2;
    const visitedNodesInOrder = AStar2(grid, startNode, finishNode, piece); //AStar should return the order of Nodes which it visited
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const piece = this.props.onPiece2;
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode, piece);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  getAlgorithm() {
    return this.props.onAlgo;
  }

  getNewGridWithWallToggledBase(row, col) {
    getNewGridWithWallToggled(this.state.grid, row, col);
  }

  visualizeAlgorithm() {
    console.log(this.getAlgorithm());
    if (this.getAlgorithm() === "Dijkstra") {
      console.log("visualizing dijkstra");
      this.visualizeDijkstra();
      return;
    } else {
      console.log("visualizing a*");
      this.visualizeAStar();
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div>
        <button
          class="btn btn-success btn-sm mr-2"
          onClick={() => this.visualizeAlgorithm()} //change to visualizeAlgorithm
        >
          Visualize {this.props.onAlgo} with {this.props.onPiece2}
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    isBrown,
                    isWhite
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isBrown={isBrown}
                      isWhite={isWhite}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 16; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isBrown: (row % 2 == 0 && col % 2 != 0) || (row % 2 != 0 && col % 2 == 0),
    isWhite: !(row % 2 == 0 && col % 2 != 0) || (row % 2 != 0 && col % 2 == 0),
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
    isBrown: !node.isBrown,
    isWhite: !node.isWhite
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
