import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rowsColumns;
  currentPossibilities = [];
  currentId;
  rowNumber;
  colNumber;
  boxNumber;

  tiles = []

  gridSizes = [
    4,
    9
  ]
  
  cells = [
  ]

  addCell() {
    this.cells = []

    if(this.rowsColumns == 4) {
      for (var i = 0; i < this.rowsColumns*this.rowsColumns; i++) {
        this.rowNumber = Math.ceil((i+1)/this.rowsColumns);
        this.colNumber = this.getColNumbers(i);
        this.boxNumber = this.getBoxNumbers(i);

        this.cells[i] = {
          "row" : this.rowNumber,
          "col" : this.colNumber,
          "box" : this.boxNumber,
          "id" : i,
          "num" : null,
          "possibilities" : [1,2,3,4]
        }
        this.tiles[i] = {text: this.cells[i].id, cols: 1, rows: 1, color: 'lightblue'};
      }
    }else if(this.rowsColumns == 9) {
      for (var i = 0; i < this.rowsColumns*this.rowsColumns; i++) {
        this.rowNumber = Math.ceil((i+1)/this.rowsColumns);
        this.colNumber = this.getColNumbers(i);
        this.boxNumber = this.getBoxNumbers(i);

        this.cells[i] = {
          "row" : this.rowNumber,
          "col" : this.colNumber,
          "box" : this.boxNumber,
          "id" : i,
          "num" : null,
          "possibilities" : [1,2,3,4,5,6,7,8,9]
        }
        this.tiles[i] = {
          tileData: {
            "row" : this.rowNumber,
            "col" : this.colNumber,
            "box" : this.boxNumber,
            "id" : i,
            "num" : null,
            "possibilities" : [1,2,3,4,5,6,7,8,9]
          }, 
          cols: 1, 
          rows: 1, 
          color: 'lightblue'};
      }
    }
  }

  checkClick(index: number) {
    console.log(index + " clicked");
  }

  getColNumbers(i: number) {
    var colNumber;

    if(i < this.rowsColumns) {
      colNumber = i+1;
    }
    for (var j = 1; j < this.rowsColumns; j++) {
      if(i >= this.rowsColumns*j && i < this.rowsColumns*(j+1)) {
        colNumber = (i+1) - this.rowsColumns*j;
      }
    }
    return colNumber;
  }

  getBoxNumbers(i: number) {
    this.tiles.forEach(c => {
      if(c.tileData.row == 1 || c.tileData.row == 2 || c.tileData.row == 3) {
        if(c.tileData.col == 1 || c.tileData.col == 2 || c.tileData.col == 3) {
          c.tileData.box = 1;
        }else if(c.tileData.col == 4 || c.tileData.col == 5 || c.tileData.col == 6) {
          c.tileData.box = 2;
        }else if(c.tileData.col == 7 || c.tileData.col == 8 || c.tileData.col == 9) {
          c.tileData.box = 3;
        }
      }
      if(c.tileData.row == 4 || c.tileData.row == 5 || c.tileData.row == 6) {
        if(c.tileData.col == 1 || c.tileData.col == 2 || c.tileData.col == 3) {
          c.tileData.box = 4;
        }else if(c.tileData.col == 4 || c.tileData.col == 5 || c.tileData.col == 6) {
          c.tileData.box = 5;
        }else if(c.tileData.col == 7 || c.tileData.col == 8 || c.tileData.col == 9) {
          c.tileData.box = 6;
        }
      }
      if(c.tileData.row == 7 || c.tileData.row == 8 || c.tileData.row == 9) {
        if(c.tileData.col == 1 || c.tileData.col == 2 || c.tileData.col == 3) {
          c.tileData.box = 7;
        }else if(c.tileData.col == 4 || c.tileData.col == 5 || c.tileData.col == 6) {
          c.tileData.box = 8;
        }else if(c.tileData.col == 7 || c.tileData.col == 8 || c.tileData.col == 9) {
          c.tileData.box = 9;
        }
      }
    });
  }

  setRowColumnNumber(num) {
    this.rowsColumns = num;
  }

  showPossibilities(id: number) {
    this.currentId = id;
    this.currentPossibilities = [];

    this.tiles[this.currentId].tileData.possibilities.forEach(e => {
      this.currentPossibilities.push(e);
    });
  }

  removePossibility(poss: number) {
    this.tiles.forEach(e => {
      if(e.tileData.id == this.currentId) {
        e.tileData.possibilities.forEach((el, i) => {
          if(el == poss) {
            this.tiles[this.currentId].tileData.possibilities.push(this.tiles[this.currentId].tileData.num);
            this.tiles[this.currentId].tileData.num = this.tiles[this.currentId].tileData.possibilities[i];
            
            // for (var k = 0; k < 2; k++) {
            //   if(this.cells[this.currentId].row == this.cells[this.currentId].row) {
            //     ele.possibilities.forEach((p, index) => {
            //       if(p == this.cells[this.currentId].possibilities[i]) {
            //         // console.log(ele.possibilities[index]);
            //         console.log(ele.num);
            //         delete ele.possibilities[index];
            //       }
            //     });
            //   }
            //   if(ele.col == this.cells[this.currentId].col) {
            //     ele.possibilities.forEach((p, index) => {
            //       if(p == this.cells[this.currentId].possibilities[i]) {
            //         delete ele.possibilities[index];
            //       }
            //     });
            //   }
            //   if(ele.box == this.cells[this.currentId].box) {
            //     ele.possibilities.forEach((p, index) => {
            //       if(p == this.cells[this.currentId].possibilities[i]) {
            //         delete ele.possibilities[index];
            //       }
            //     });
            //   }
              
            // }

            // this.cells.forEach((ele, ind) => {
            //   if(ele.row == this.cells[this.currentId].row) {
            //     ele.possibilities.forEach((p, index) => {
            //       if(p == this.cells[this.currentId].possibilities[i]) {
            //         // console.log(ele.possibilities[index]);
            //         console.log(ele.num);
            //         delete ele.possibilities[index];
            //       }
            //     });
            //   }
            //   if(ele.col == this.cells[this.currentId].col) {
            //     ele.possibilities.forEach((p, index) => {
            //       if(p == this.cells[this.currentId].possibilities[i]) {
            //         delete ele.possibilities[index];
            //       }
            //     });
            //   }
            //   if(ele.box == this.cells[this.currentId].box) {
            //     ele.possibilities.forEach((p, index) => {
            //       if(p == this.cells[this.currentId].possibilities[i]) {
            //         delete ele.possibilities[index];
            //       }
            //     });
            //   }
              
            // });




            this.tiles.forEach((ele) => {
              if(ele.tileData.row == this.tiles[this.currentId].tileData.row) {
                delete ele.tileData.possibilities[i];
              }
              if(ele.tileData.col == this.tiles[this.currentId].tileData.col) {
                delete ele.tileData.possibilities[i];
              }
              if(ele.tileData.box == this.tiles[this.currentId].tileData.box) {
                delete ele.tileData.possibilities[i];
              }
            });

            delete this.tiles[this.currentId].tileData.possibilities[i];

            this.currentPossibilities = this.tiles[this.currentId].tileData.possibilities;
          }
        });
      }
    });
  }
}