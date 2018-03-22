function Mineboard(rows, cols, mines) {

   // Eventually will be user inputs
   var self = this;
   this.numberOfMines = mines;
   this.heightOfBoard = cols;
   this.widthOfBoard = rows;
   var map = [];

   this.createBoardGrid = function() {

      for (let i = 0; i < this.widthOfBoard; i++) {
         let newRow = [];
         for (let l = 0; l < this.heightOfBoard; l++) {
            newRow.push([' ']);
         };
         map.push(newRow);
      };
      this.placeMinesArray();
   };

   // Functions
   this.createBoard = function() {

      let board = document.createElement('div');
      board.setAttribute('id', 'board');

      for (let i = 0; i < map.length; i++) {
         let row = document.createElement('div');
         row.className = 'row';
         board.appendChild(row);
         for (let l = 0; l < map[i].length; l++) {
            let cell = document.createElement('div');
            cell.id = String(i) + String(l);
            cell.className = 'cell';
            if (map[i][l][0] === 'm') {
               cell.className = 'cell mine';
            } else if (typeof(map[i][l][0]) == 'number') {
               cell.className = 'cell number';
               let paraTag = document.createElement('p');
               let text = document.createTextNode(map[i][l][0]);
               paraTag.appendChild(text);
               cell.appendChild(paraTag);
            };

            cell.addEventListener("click", function(e) {
               self.onClick();
            }, false);
            row.appendChild(cell);
         };
      };
      document.body.appendChild(board);
   };

   this.revealCell = function(typeOfCell, row, col) {
      map[row][col] = 's';
      cellToReveal = document.getElementById(String(row) + String(col));
      cellToReveal.style.backgroundColor = 'white';
      switch (typeOfCell) {
         case 'mine':
            console.log('mine');
            break;
         case 'number':
            childToReveal = cellToReveal.childNodes[0];
            childToReveal.style.display = 'block';
            break;
      };
      this.checkWin();
   }

   this.checkWin = function() {
      let mineCount = 0;
      let checkCount = 0;
      numberOfCells = this.heightOfBoard * this.widthOfBoard;
      for (let i = 0; i < map.length; i++) {
         for (let j = 0; j < map.length; j++) {
            if (map[i][j] === 's') {
               checkCount += 1;
            } else if (map[i][j].includes('m')) {
               mineCount += 1;
            }
         }
      }
      console.log(map);
      if (mineCount === numberOfCells - checkCount) {
         alert('You Win');
      }
      return;
   }

   this.sweep = function(queue, neighbors) {
      for (let i = 0; i < neighbors.length; i++) {
         // Get the coordinate of whatever neighbor we are checking at the time
         let nextRow = neighbors[i][0];
         let nextCol = neighbors[i][1];

         //Set boundaries
         let verticalBounds = nextRow >= 0 && nextCol >= 0;
         let horizontalBounds = nextRow < map.length && nextCol < map[0].length

         if (verticalBounds && horizontalBounds) {

            let neighborToCheck = map[nextRow][nextCol];

            if (neighborToCheck.includes(' ')) {
               this.revealCell('empty', nextRow, nextCol);
               queue.push(nextRow, nextCol);
               map[nextRow][nextCol][0] = 'c';
               this.revealCell('empty', nextRow, nextCol);
            } else if (Number(neighborToCheck)) {
               this.revealCell('number', nextRow, nextCol);
            } else {
               continue;
            };
         };
      };
   }

   this.showEmptySpaces = function(eventInfo) {
      const queue = [];

      // Information of what cell was clicked on
      // Using this to check on neighbors
      let idInfo = eventInfo.id;
      let row = Number(eventInfo.id[0]);
      let col = Number(eventInfo.id[1]);

      queue.push(row,col);

      while (queue.length) {
         // Taking out the first two items in the queue, which are row and col
         // of what needs to be analyzed
         let curRow = queue.shift();
         let curCol = queue.shift();

         // An array of the possible neighbors next to the whatever cell we are toggling
         const neighbors = [
            [curRow-1, curCol], // Up
            [curRow, curCol+1], // Right
            [curRow+1, curCol], // Down
            [curRow, curCol-1] // Left
         ]

         this.sweep(queue, neighbors);
   };
}

   this.onClick = function(e) {
      let cell = event.target;
      let hasMineClass = cell.classList.contains('mine');
      let hasNumberClass = cell.classList.contains('number');
      if (hasMineClass) {
         this.mineExplosion();
      } else if (hasNumberClass) {
         this.revealCell('number', cell.id[0], cell.id[1])
      } else {
         this.showEmptySpaces(cell);
      };
   }

   this.mineExplosion = function() {
      let mines = document.getElementsByClassName('mine');

      for (let i = 0; i < mines.length; i++) {
         mines[i].style.backgroundColor = 'white';
         mines[i].style.backgroundImage = "url('mine.png')";
      }
      alert('You lose');
   }

   this.placeMinesArray = function() {
      let mineIteration = 0;

      while (mineIteration < this.numberOfMines) {
         let x = Math.floor((Math.random() * this.widthOfBoard));
         let y = Math.floor((Math.random() * this.heightOfBoard));

         if (x === 0, y === 0 ){continue;};

         if (map[x][y].includes(' ')) {
            map[x][y] = ['m'];
            mineIteration++;
         };
      };

      this.placeNumbersArray();
      this.createBoard();
   };

   this.countMines = function(row, col) {
      const neighbors = [
         [row + 1, col], // Check Down
         [row - 1, col], // Check Up
         [row, col - 1], // Check Left
         [row, col + 1],  // Check Right
         [row-1, col-1], // Check Up and to Left
         [row-1, col+1], // Check Up and to the Right
         [row+1, col+1], // Check Down and to the Right
         [row+1, col-1] // Check Down and to the Left
      ]
      let count = 0;

      for (let i = 0; i < neighbors.length; i++) {
         const nextRow = neighbors[i][0];
         const nextCol = neighbors[i][1];

         const checkingInVerticalBounds = () => nextRow >= 0 && nextRow < map.length
         const checkingInHorizontalBounds = () => nextCol >= 0 && nextCol < map[nextRow].length;

         if (checkingInVerticalBounds() && checkingInHorizontalBounds() && map[nextRow][nextCol][0] === 'm') {
            count += 1;
         } else {
            continue;
         };
      };
      return count;
   };

   this.placeNumbersArray = function() {

      for (let i = 0; i < map.length; i++) {
         for (let j = 0; j < map[i].length; j++) {
               let newNum = this.countMines(i, j);
               if (map[i][j][0] === ' ' && newNum > 0) {
               map[i][j][0] = newNum;
            };
         };
      };
   };
}

var easy = new Mineboard(7, 7, 6);
easy.createBoardGrid();
