// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function AStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  //set the heuristic value of all nodes
  for (let i = 0; i < unvisitedNodes.length; i++) {
    unvisitedNodes[i].heuristic = ASDistance(unvisitedNodes[i]);
  }
  while (!!unvisitedNodes.length) {
    // for (let i = 0; i < unvisitedNodes.length; i++) {
    //   console.log(unvisitedNodes[i]);
    // }
    sortNodesByDistance(unvisitedNodes); //maybe i should choose the node equal to the lowest distance with the lowest heuristic
    //sortNodesByHeuristic(unvisitedNodes);

    let minHeuristicIndex = 0;
    let y = 1;
    while (unvisitedNodes[y].distance == unvisitedNodes[0].distance) {
      if (
        unvisitedNodes[y].heuristic <
        unvisitedNodes[minHeuristicIndex].heuristic
      ) {
        minHeuristicIndex = y;
      }
    }
    const closestNode = unvisitedNodes[minHeuristicIndex];
    unvisitedNodes.splice(minHeuristicIndex, 1);

    //const closestNode = unvisitedNodes.shift(); //this should choose the closest node to the end position based on manhattan distance
    console.log(closestNode.distance, closestNode.heuristic);
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) {
      console.log("returned from isWall");
      continue;
    }
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) {
      console.log("returned from in trap");
      return visitedNodesInOrder;
    }
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      console.log("exited naturally");
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByHeuristic(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.heuristic - nodeB.heuristic);
}

function ASDistance(node) {
  //heuristic = manhattan distance
  const { col, row } = node;
  return Math.sqrt(
    Math.pow(Math.abs(39 - col), 2) + Math.pow(Math.abs(10 - row), 2)
  );
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvistedNeighborsBishop(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  if (row < grid.length - 1 && col < grid[0].length - 1)
    neighbors.push(grid[row + 1][col + 1]);
  if (row > 0 && col < grid[0].length - 1)
    neighbors.push(grid[row - 1][col + 1]);
  if (col < grid[0].length - 1 && row < grid.length)
    neighbors.push(grid[row + 1][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getUnvisitedNeighborsQueen(node, grid) {
  //will adjust neighbors for dif chess pieces
  const neighbors = [];
  const { col, row } = node;
  //diagonals
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  if (row < grid.length - 1 && col < grid[0].length - 1)
    neighbors.push(grid[row + 1][col + 1]);
  if (row > 0 && col < grid[0].length - 1)
    neighbors.push(grid[row - 1][col + 1]);
  if (col < grid[0].length - 1 && row < grid.length)
    neighbors.push(grid[row + 1][col + 1]);
  //horizontal/verticals
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getUnvisitedNeighborsHorse(node, grid) {
  //will adjust neighbors for dif chess pieces
  const neighbors = [];
  const { col, row } = node;
  //upper left
  if (row - 1 > 0 && col > 0) neighbors.push(grid[row - 2][col - 1]);
  if (row > 0 && col - 1 > 0) neighbors.push(grid[row - 1][col - 2]);
  //upper right
  if (row - 1 > 0 && col < grid[0].length)
    neighbors.push(grid[row - 2][col + 1]);
  if (row > 0 && col + 1 < grid[0].length)
    neighbors.push(grid[row - 1][col + 2]);
  //lower left
  if (col - 1 > 0 && row < grid.length - 1)
    neighbors.push(grid[row + 1][col - 2]);
  if (col > 0 && row + 1 < grid.length - 1)
    neighbors.push(grid[row + 2][col - 1]);
  //lower right
  if (row + 1 < grid.length && col < grid[0].length)
    neighbors.push(grid[row + 2][col + 1]);
  if (row < grid.length && col + 1 < grid[0].length)
    neightbors.push(grid[row + 1][col + 2]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

//rook
function getUnvisitedNeighbors(node, grid) {
  //will adjust neighbors for dif chess pieces
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the AStar method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
