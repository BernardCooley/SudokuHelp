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
      }
    }
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
    this.cells.forEach(c => {
      
      // for (var i = 0, j = 0; i < 3; i++, j+3) {
      //   if(c.row == j+1 || c.row == j+2 || c.row == j+3) {
      //     if(c.col == 1 || c.col == 2 || c.col == 3) {
      //       c.box = j+1;
      //     }else if(c.col == 4 || c.col == 5 || c.col == 6) {
      //       c.box = j+2;
      //     }else if(c.col == 7 || c.col == 8 || c.col == 9) {
      //       c.box = j+3;
      //     }
      //   }
      // }

      if(c.row == 1 || c.row == 2 || c.row == 3) {
        if(c.col == 1 || c.col == 2 || c.col == 3) {
          c.box = 1;
        }else if(c.col == 4 || c.col == 5 || c.col == 6) {
          c.box = 2;
        }else if(c.col == 7 || c.col == 8 || c.col == 9) {
          c.box = 3;
        }
      }
      if(c.row == 4 || c.row == 5 || c.row == 6) {
        if(c.col == 1 || c.col == 2 || c.col == 3) {
          c.box = 4;
        }else if(c.col == 4 || c.col == 5 || c.col == 6) {
          c.box = 5;
        }else if(c.col == 7 || c.col == 8 || c.col == 9) {
          c.box = 6;
        }
      }
      if(c.row == 7 || c.row == 8 || c.row == 9) {
        if(c.col == 1 || c.col == 2 || c.col == 3) {
          c.box = 7;
        }else if(c.col == 4 || c.col == 5 || c.col == 6) {
          c.box = 8;
        }else if(c.col == 7 || c.col == 8 || c.col == 9) {
          c.box = 9;
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

    this.cells[this.currentId].possibilities.forEach(e => {
      this.currentPossibilities.push(e);
    });
  }

  removePossibility(poss: number) {
    this.cells.forEach(e => {
      if(e.id == this.currentId) {
        e.possibilities.forEach((el, i) => {
          if(el == poss) {
            this.cells[this.currentId].possibilities.push(this.cells[this.currentId].num);
            this.cells[this.currentId].num = this.cells[this.currentId].possibilities[i];
            
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

            this.cells.forEach((ele, ind) => {
              if(ele.row == this.cells[this.currentId].row) {
                ele.possibilities.forEach((p, index) => {
                  if(p == this.cells[this.currentId].possibilities[i]) {
                    // console.log(ele.possibilities[index]);
                    console.log(ele.num);
                    delete ele.possibilities[index];
                  }
                });
              }
              if(ele.col == this.cells[this.currentId].col) {
                ele.possibilities.forEach((p, index) => {
                  if(p == this.cells[this.currentId].possibilities[i]) {
                    delete ele.possibilities[index];
                  }
                });
              }
              if(ele.box == this.cells[this.currentId].box) {
                ele.possibilities.forEach((p, index) => {
                  if(p == this.cells[this.currentId].possibilities[i]) {
                    delete ele.possibilities[index];
                  }
                });
              }
              
            });




            // this.cells.forEach((ele) => {
            //   if(ele.row == this.cells[this.currentId].row) {
            //     delete ele.possibilities[i];
            //   }
            //   if(ele.col == this.cells[this.currentId].col) {
            //     delete ele.possibilities[i];
            //   }
            //   if(ele.box == this.cells[this.currentId].box) {
            //     delete ele.possibilities[i];
            //   }
            // });

            delete this.cells[this.currentId].possibilities[i];

            this.currentPossibilities = this.cells[this.currentId].possibilities;
          }
        });
      }
    });
  }
}