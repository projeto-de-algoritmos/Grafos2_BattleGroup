import tarjan from 'strongly-connected-components';

export function findCircuits(edges, cb) {
  let circuits = []; // Output

  let stack = [];
  let blocked = [];
  let B = {};
  let Ak = [];
  let s;

  function unblock(u) {
    blocked[u] = false;
    if (B.hasOwnProperty(u)) {
      Object.keys(B[u]).forEach(function (w) {
        delete B[u][w];
        if (blocked[w]) {
          unblock(w);
        }
      });
    }
  }

  function circuit(v) {
    let found = false;

    stack.push(v);
    blocked[v] = true;

    // L1
    let i;
    let w;
    for (i = 0; i < Ak[v].length; i++) {
      w = Ak[v][i];
      if (w === s) {
        output(s, stack);
        found = true;
      } else if (!blocked[w]) {
        found = circuit(w);
      }
    }

    // L2
    if (found) {
      unblock(v);
    } else {
      for (i = 0; i < Ak[v].length; i++) {
        w = Ak[v][i];
        let entry = B[w];

        if (!entry) {
          entry = {};
          B[w] = entry;
        }

        entry[w] = true;
      }
    }
    stack.pop();
    return found;
  }

  function output(start, stack) {
    let cycle = [].concat(stack).concat(start);
    if (cb) {
      cb(circuit);
    } else {
      circuits.push(cycle);
    }
  }

  function subgraph(minId) {
    // Remove edges with indice smaller than minId
    for (let i = 0; i < edges.length; i++) {
      if (i < minId) edges[i] = [];
      edges[i] = edges[i].filter(function (i) {
        return i >= minId;
      });
    }
  }

  function adjacencyStructureSCC(from) {
    // Make subgraph starting from vertex minId
    subgraph(from);
    let g = edges;

    // Find strongly connected components using Tarjan algorithm
    let sccs = tarjan(g);

    // Filter out trivial connected components (ie. made of one node)
    let ccs = sccs.components.filter(function (scc) {
      return scc.length > 1;
    });

    // Find least vertex
    let leastVertex = Infinity;
    let leastVertexComponent;
    for (let i = 0; i < ccs.length; i++) {
      for (let j = 0; j < ccs[i].length; j++) {
        if (ccs[i][j] < leastVertex) {
          leastVertex = ccs[i][j];
          leastVertexComponent = i;
        }
      }
    }

    let cc = ccs[leastVertexComponent];

    if (!cc) return false;

    // Return the adjacency list of first component
    let adjList = edges.map(function (l, index) {
      if (cc.indexOf(index) === -1) return [];
      return l.filter(function (i) {
        return cc.indexOf(i) !== -1;
      });
    });

    return {
      leastVertex,
      adjList,
    };
  }

  s = 0;
  let n = edges.length;
  while (s < n) {
    // find strong component with least vertex in
    // subgraph starting from vertex `s`
    let p = adjacencyStructureSCC(s);

    // Its least vertex
    s = p.leastVertex;
    // Its adjacency list
    Ak = p.adjList;

    if (Ak) {
      for (let i = 0; i < Ak.length; i++) {
        for (let j = 0; j < Ak[i].length; j++) {
          let vertexId = Ak[i][j];
          blocked[+vertexId] = false;
          B[vertexId] = {};
        }
      }
      circuit(s);
      s += 1;
    } else {
      s = n;
    }
  }

  if (cb) {
  } else {
    return circuits;
  }
}
