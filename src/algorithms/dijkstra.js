// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode, piece) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;

    if (piece == "Rook") updateUnvisitedNeighborsRook(closestNode, grid);
    if (piece == "Bishop") updateUnvisitedNeighborsBishop(closestNode, grid);
    if (piece == "Queen") updateUnvisitedNeighborsQueen(closestNode, grid);
    if (piece == "Horse") updateUnvisitedNeighborsHorse(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
//rook
function updateUnvisitedNeighborsRook(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighborsRook(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

//bishop
function updateUnvisitedNeighborsBishop(node, grid) {
  //console.log({this.props.onPiece2});
  const unvisitedNeighbors = getUnvisitedNeighborsBishop(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

//queen
function updateUnvisitedNeighborsQueen(node, grid) {
  //console.log({this.props.onPiece2});
  const unvisitedNeighbors = getUnvisitedNeighborsQueen(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

//horse
function updateUnvisitedNeighborsHorse(node, grid) {
  //console.log({this.props.onPiece2});
  const unvisitedNeighbors = getUnvisitedNeighborsHorse(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighborsBishop(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  //top left
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  //bottom right
  if (row < grid.length - 1 && col < grid[0].length - 1)
    neighbors.push(grid[row + 1][col + 1]);
  //top right
  if (row > 0 && col < grid[0].length - 1)
    neighbors.push(grid[row - 1][col + 1]);
  //bottom left
  if (col > 0 && row < grid.length - 1) neighbors.push(grid[row + 1][col - 1]);
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
  if (col < grid[0].length - 1 && row < grid.length - 1)
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
  if (row + 1 < grid.length - 1 && col < grid[0].length - 1)
    neighbors.push(grid[row + 2][col + 1]);
  if (row < grid.length - 1 && col + 1 < grid[0].length - 1)
    neighbors.push(grid[row + 1][col + 2]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

//rook
function getUnvisitedNeighborsRook(node, grid) {
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
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
