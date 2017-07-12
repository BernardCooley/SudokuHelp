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

  tiles = [];

  gridSize = 4;

  gridSizes = [
    4,
    9
  ];

  addCell() {
    this.tiles = []

    if(this.rowsColumns == 4) {
      for (var i = 0; i < this.rowsColumns*this.rowsColumns; i++) {
        this.rowNumber = Math.ceil((i+1)/this.rowsColumns);
        this.colNumber = this.getColNumbers(i);
        this.boxNumber = this.getBoxNumbers(i);

        this.tiles[i] = {
          tileData: {
            "row" : this.rowNumber,
            "col" : this.colNumber,
            "box" : this.boxNumber,
            "id" : i,
            "num" : null,
            "possibilities" : [1,2,3,4]
          }, 
          cols: 1, 
          rows: 1, 
          color: 'lightblue'
        };
      }
    }else if(this.rowsColumns == 9) {
      for (var i = 0; i < this.rowsColumns*this.rowsColumns; i++) {
        this.rowNumber = Math.ceil((i+1)/this.rowsColumns);
        this.colNumber = this.getColNumbers(i);
        this.boxNumber = this.getBoxNumbers(i);

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
          color: 'lightblue'
        };
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

  modifyPossibilities(poss: number) {
    this.tiles.forEach(e => {
      if(e.tileData.id == this.currentId) {
        e.tileData.possibilities.forEach((el, i) => {
          if(el == poss) {
            this.tiles[this.currentId].tileData.possibilities.push(this.tiles[this.currentId].tileData.num);
            this.tiles[this.currentId].tileData.num = this.tiles[this.currentId].tileData.possibilities[i];
            
            this.tiles.forEach((ele) => {
              if(ele.tileData.row == this.tiles[this.currentId].tileData.row) {
                this.removePossibilitiesByValue(poss, ele.tileData.possibilities);
              }
              if(ele.tileData.col == this.tiles[this.currentId].tileData.col) {
                this.removePossibilitiesByValue(poss, ele.tileData.possibilities);
              }
              if(ele.tileData.box == this.tiles[this.currentId].tileData.box) {
                this.removePossibilitiesByValue(poss, ele.tileData.possibilities);
              }
            });

            this.removePossibilitiesByValue(poss, this.tiles[this.currentId].tileData.possibilities);

            this.showPossibilities(this.currentId);
          }
        });
      }
    });
  }

  removePossibilitiesByValue(value: number, possibilities: Array<number>) {
    let index: number = possibilities.indexOf(value);
    if (index !== -1) {
      possibilities.splice(index, 1);
    }
  }

}