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

function draw() {
  background(220);
  
}

function createNodes(){ 
  for(let i = 0; i < 50;i++){
    nodes.push(new Node(createVector(random(width), random(height)),i));
  }
}
