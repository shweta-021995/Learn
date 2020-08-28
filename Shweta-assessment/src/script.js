var grid = document.getElementById("grid");
var testMode = false; 
gridGeneration();

function gridGeneration() {
  grid.innerHTML="";
  for (var i=0; i<10; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { cellHandler(this); };
      var mine = document.createAttribute("data-mine");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  add();
}

function add() {
  for (var i=0; i<20; i++) {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine","true");
    if (testMode) cell.innerHTML="X";
  }
}

function reveal() {
    for (var i=0; i<10; i++) {
      for(var j=0; j<10; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine")=="true") cell.className="mine";
      }
    }
}

function isLevelComplete() {
  var levelComplete = true;
    for (var i=0; i<10; i++) {
      for(var j=0; j<10; j++) {
        if ((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
      }
  }
  if (levelComplete) {
    alert("You Win!");
    reveal();
  }
}

function cellHandler(cell) {
  if (cell.getAttribute("data-mine")=="true") {
    reveal();
    alert("Game Over");
  } else {
    cell.className="clicked";
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
      }
    }
    cell.innerHTML=mineCount;
    if (mineCount==0) { 
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
          if (grid.rows[i].cells[j].innerHTML=="") cellHandler(grid.rows[i].cells[j]);
        }
      }
    }
    isLevelComplete();
  }
}