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
   }

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
            cell.className = 'cell';
            if (!map[i][l].includes(' ')) {
               cell.id = 'mine';
            }

            cell.addEventListener("click", function(e) {self.revealCell();}, false);
            row.appendChild(cell);
         };
      };
      document.body.appendChild(board);
   }

   this.revealCell = function(e) {
      let cell = event.target;
      cell.style.backgroundColor = 'white';
      if (cell.id === 'mine') {
         cell.style.backgroundImage = "url('mine.png')";
         this.mineExplosion();
      }
   }

   this.mineExplosion = function() {
      let mines = document.getElementsByClassName('cell');
   }

   this.placeMinesArray = function() {
      // Randomly generating nums to place mines
      let mineIteration = 0;

      while (mineIteration < 5) {
         let x = Math.floor((Math.random() * this.widthOfBoard));
         let y = Math.floor((Math.random() * this.heightOfBoard));

         if (map[x][y].includes(' ')) {
            map[x][y] = ['m'];
            mineIteration ++;
         };
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
