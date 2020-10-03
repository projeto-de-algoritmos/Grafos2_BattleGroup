var nodes = new Array();
var connections = new Array();
var reached = new Array();
var unreached = new Array();


function Node(location, index) {
  this.location = location;
  this.isReached = false;
  this.isLeaf = true;
  this.index = index;
}

function Connection(newConnectedNode,connectingNode) {
  this.node1 = newConnectedNode;
  this.node2 = connectingNode;

  connectingNode.isLeaf = false;
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  createNodes();
  reached = [];
  unreached = nodes.slice();

  prim()
}


function draw() {
  background(220);
  drawConnections();
  drawNodes();
}

function createNodes() {
  console.log("WIDTH",width)
  console.log("height",height)
  for (let i = 0; i < 5; i++) {
    let nodeWidth = random(width) + 60;
    if(nodeWidth > width ){
      console.log("ENTROU AQUI")
      nodeWidth = width/2
    }

    let nodeHeight = random(height) + 60;
    if(nodeHeight > height ){
      nodeHeight = height/2
      console.log("ENTROU AQUI 2");
    }

    console.log("Node width",nodeWidth);
    console.log("Node height",nodeHeight);
    nodes.push(new Node(createVector(nodeWidth, nodeHeight), i));
    console.log
  }
}

function drawNodes() {
  nodes.forEach((node) => {
    if(node.index == 0){
      fill(220,0,220)
    }else{
      fill(0, 220, 0);
      
    }

      ellipse(node.location.x - 30, node.location.y - 30, 30);
      fill(0);
      textAlign(CENTER);
      textSize(12);
      text(node.index, node.location.x - 30, node.location.y -30);
  });
}

function drawConnections() {
  connections.forEach(function(connection) {
    fill(0);
    stroke(0);
    line(connection.node1.location.x -20, connection.node1.location.y -20, connection.node2.location.x -20, connection.node2.location.y -20);    
  });
}

function prim() {
 
  connections = [];
  nodes.forEach(function(node) {
    node.isReached = false;
    node.isLeaf = true;
  });

  var firstNode = unreached[0];
  firstNode.isReached = true;
  reached.push(firstNode);


  doCalculation();
}

function doCalculation() {
  if(unreached.length > 0) {
    calculateConnection();
    setTimeout(doCalculation, 2000);   
  } else {
    console.log("Terminou");
  }
}


function calculateConnection() {
  var record = width;
  var closestNode, connectingNode;

  reached.forEach(function(reachedNode) {
    unreached.forEach(function(unreachedNode) {
      var d = dist(reachedNode.location.x,reachedNode.location.y,unreachedNode.location.x,unreachedNode.location.y);

      if(d < record) {
        record = d;
        closestNode = unreachedNode;
        connectingNode = reachedNode;
      }
    });
  });
  connections.push(new Connection(closestNode,connectingNode));
  closestNode.isReached = true;
  reached.push(unreached.splice(unreached.indexOf(closestNode),1)[0]);
}