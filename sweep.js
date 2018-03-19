function Mineboard(rows, cols, mines) {

   // Eventually will be user inputs
   var self = this;
   this.numberOfMines = mines;
   this.heightOfBoard = cols;
   this.widthOfBoard = rows;
   var map = [];

   this.createBoardGrid = function() {
      console.log(map);

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
            if (map[i][l][0] === 'm') {
               cell.className = 'cell mine';
            } else if (typeof(map[i][l][0]) == 'number') {
               cell.className = 'cell number';
               let paraTag = document.createElement('p')
               let text = document.createTextNode(map[i][l][0])
               paraTag.appendChild(text);
               cell.appendChild(paraTag);
            }

            cell.addEventListener("click", function(e) {
               self.revealCell();
            }, false);
            row.appendChild(cell);
         };
      };
      document.body.appendChild(board);
   };

   this.revealCell = function(e) {
      let cell = event.target;
      let hasMineClass = cell.classList.contains('mine');
      let hasNumberClass = cell.classList.contains('number');
      cell.style.backgroundColor = 'white';
      if (hasMineClass) {
         cell.style.backgroundImage = "url('mine.png')";
         this.mineExplosion();
      } else if (hasNumberClass) {
         cell.firstChild.style.display = 'block';
      }
   }

   this.mineExplosion = function() {
      let mines = document.getElementsByClassName('cell');
   }

   this.placeMinesArray = function() {
      // Randomly generating nums to place mines
      let mineIteration = 0;

      while (mineIteration < 3) {
         let x = Math.floor((Math.random() * this.widthOfBoard));
         let y = Math.floor((Math.random() * this.heightOfBoard));

         if (x ===0, y === 0 ){
            continue;
         };

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
         [row, col + 1]  // Check Right
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
            if (map[i][j][0] === ' ') {
               let newNum = this.countMines(i, j);
               map[i][j][0] = newNum;
            };
         };
      };

      // A for loop that goes through each cell
      // Check to see if theres a mine within the bordering cells
      // Send that cell information to countMines
      // Return the count of the mines surrounding the cell
      // Place that number as the innerHTML or something
   };
}

var easy = new Mineboard(4, 4, 3);
easy.createBoardGrid();

// Generate a nested array map with several options: ' ', 'B'
// Perhaps place all of the ' ' first and then use the place mines function to while loop through it and randomly place mines
// Then, go back and add the numebrs inside of that array based on the bombs around it
// Loop through the map array and create the board based on what is in the map
// Click event will check whether it is a bomb, empty or number
// If bomb display all the bombs
// If number just display the number
// If empty, ?(loop) through the areas around it and stop when there is a number
