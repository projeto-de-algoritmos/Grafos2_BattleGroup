var nodes = new Array();
var connections = new Array();


function Node(location, index) {
  this.location = location;
  this.isReached = false;
  this.isLeaf = true;
  this.index = index;
}

function Connection(newConnectedNode,connectingNode) {
  this.n1 = newConnectedNode;
  this.n2 = connectingNode;

  connectingNode.isLeaf = false;
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  createNodes();
}


function draw() {
  background(220);
  drawNodes();
}

function createNodes() {
  for (let i = 0; i < 50; i++) {
    nodes.push(new Node(createVector(random(width), random(height)), i));
  }
}

function drawNodes() {
  nodes.forEach((node) => {
    fill(0, 220, 0);
    ellipse(node.location.x, node.location.y, 30);
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(node.index, node.location.x, node.location.y);
  });
}