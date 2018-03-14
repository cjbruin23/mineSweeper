function Mineboard(rows, cols, mines) {

   // Eventually will be user inputs
   var self = this;
   this.numberOfMines = mines;
   this.heightOfBoard = cols;
   this.widthOfBoard = rows;

   // Functions
   this.create = function() {

      let board = document.createElement('div');
      board.setAttribute('id', 'board');

      for (let i = 0; i < this.widthOfBoard; i++) {
         let row = document.createElement('div');
         row.className = 'row';
         board.appendChild(row);
         for (let l = 0; l < this.heightOfBoard; l++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener("click", function(e) {self.revealCell();}, false);
            row.appendChild(cell);
         };
      };
      document.body.appendChild(board);
      this.placeMines();
   },

   this.revealCell = function(e) {
      console.log('hello');
   }

   this.placeMines = function() {
      // Eventually will be user inputed
      let cellsToPlaceMines = document.getElementsByClassName('cell');

      // Randomly generating nums to place mines
      let i = 0;

      while (i < 5) {
         randomCellNum = Math.floor(Math.random() * cellsToPlaceMines.length);
         let newMine = document.createElement('div');
         newMine.className = 'mine';

         let isCellEmpty = cellsToPlaceMines[randomCellNum].hasChildNodes();

         if (isCellEmpty) {
            continue;
         } else {
            cellsToPlaceMines[randomCellNum].appendChild(newMine);
            i += 1;
         }
      }
   }
}

var easy = new Mineboard(7, 7, 5);
easy.create();

// Generate the board with a function
   // Number of mines will eventually be a user input
   // Randomly place those mines within the board
      // Perhaps query select all of the divs with class 'cell' and randomly select those to place mines
