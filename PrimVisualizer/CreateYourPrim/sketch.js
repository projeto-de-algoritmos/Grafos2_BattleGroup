let nodes = new Array();
let connections = new Array();
let reached = new Array();
let unreached = new Array();
let visitedNodeIndex = 0;

function Node(location, index) {
  this.location = location;
  this.isReached = false;
  this.isLeaf = true;
  this.index = index;
}

function Connection(newConnectedNode, connectingNode) {
  this.node1 = newConnectedNode;
  this.node2 = connectingNode;

  connectingNode.isLeaf = false;
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  }

function draw() {
  background(220);
  textSize(32)
  textAlign(CENTER)
  text('Create your graph', width / 2, 50)
  drawConnections();
  drawNodes();
}


function drawNodes() {
  nodes.forEach((node) => {
    if (node.index == 1) {
      fill(220, 0, 220);
    } else {
      if (node.isReached) {
        fill(0, 220, 0);
      }
    }

    ellipse(node.location.x , node.location.y , 30);
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(node.index, node.location.x, node.location.y);
  });
}

function drawConnections() {
  connections.forEach(function (connection) {
    fill(0);
    stroke(0);
    line(
      connection.node1.location.x ,
      connection.node1.location.y ,
      connection.node2.location.x ,
      connection.node2.location.y 
    );
  });
}

function prim() {
  connections = [];
  nodes.forEach(function (node) {
    node.isReached = false;
    node.isLeaf = true;
  });

  let firstNode = unreached[0];
  firstNode.index = visitedNodeIndex;
  firstNode.isReached = true;
  reached.push(firstNode);

  visitedNodeIndex = visitedNodeIndex + 1;
  doCalculation();
}

function doCalculation() {
  if (unreached.length > 0) {
    calculateConnection();
    setTimeout(doCalculation, 2000);
  } else {
    console.log("Terminou");
  }
}

function calculateConnection() {
  let record = width;
  let closestNode, connectingNode;

  reached.forEach(function (reachedNode) {
    unreached.forEach(function (unreachedNode) {
      let d = dist(
        reachedNode.location.x,
        reachedNode.location.y,
        unreachedNode.location.x,
        unreachedNode.location.y
      );

      if (d < record) {
        record = d;
        closestNode = unreachedNode;
        closestNode.index = visitedNodeIndex;
        connectingNode = reachedNode;
      }
    });
  });
  visitedNodeIndex = visitedNodeIndex + 1;
  connections.push(new Connection(closestNode, connectingNode));
  closestNode.isReached = true;
  reached.push(unreached.splice(unreached.indexOf(closestNode), 1)[0]);
}


function mousePressed() {
  if(mouseY > 0){
    nodes.push(new Node(createVector(mouseX,mouseY)));
  }

}

function startPrim(){
  reached = [];
  unreached = nodes.slice();
  prim()

}