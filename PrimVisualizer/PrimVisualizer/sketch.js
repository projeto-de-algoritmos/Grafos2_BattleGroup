var nodes = new Array();

function Node(location, index) {
  this.location = location;
  this.isReached = false;
  this.isLeaf = true;
  this.index = index;
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  createNodes();
}

function drawNodes() {
  nodes.forEach((node) => {
    fill(0, 220, 0);
    ellipse(node.location.x, node.location.y, 20);
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(node.index, node.location.x, node.location.y);
  });
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
