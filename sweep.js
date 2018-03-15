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
      this.placeMines();
   }

   // Functions
   this.createBoard = function() {

      let board = document.createElement('div');
      board.setAttribute('id', 'board');
      console.log(map);

      for (let i = 0; i < map.length; i++) {
         let row = document.createElement('div');
         row.className = 'row';
         board.appendChild(row);
         for (let l = 0; l < map[i].length; l++) {
            let cell = document.createElement('div');
            let checkIfEmpty = map[i][l].includes(" ")
            if (checkIfEmpty) {
               cell.className = 'cell';
            } else {
               cell.className = 'mine';
            }

            cell.addEventListener("click", function(e) {self.revealCell();}, false);
            row.appendChild(cell);
         };
      };
      document.body.appendChild(board);
   }

   this.revealCell = function(e) {
      let cell = event.target
      let mineObj = cell.childNodes[0];
      let containsMine = (typeof(event.target.childNodes[0]) !== 'undefined');
      event.target.style.backgroundColor = 'white';

      if (containsMine) {
         mineObj.style.display = 'block';
         this.showMines();
      } else {
         return
      }
   }

   this.placeMines = function() {
      // Eventually will be user inputed
      let cellsToPlaceMines = document.getElementsByClassName('cell');
      // Randomly generating nums to place mines
      let mineIteration = 0;

      while (mineIteration < 5) {
         let x = Math.floor((Math.random() * this.widthOfBoard));
         let y = Math.floor((Math.random() * this.heightOfBoard));

         if (map[x][y].includes(' ')) {
            map[x][y] = ['m'];
            mineIteration ++;
            console.log(mineIteration);
         }
      }
      this.createBoard();
   }

}

var easy = new Mineboard(7, 7, 5);
easy.createBoardGrid();

// Generate a nested array map with several options: ' ', 'B'
   // Perhaps place all of the ' ' first and then use the place mines function to while loop through it and randomly place mines
// Then, go back and add the numebrs inside of that array based on the bombs around it
// Loop through the map array and create the board based on what is in the map
// Click event will check whether it is a bomb, empty or number
// If bomb display all the bombs
// If number just display the number
// If empty, ?(loop) through the areas around it and stop when there is a number
