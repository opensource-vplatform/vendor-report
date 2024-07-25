class Report {

  cells = [];

  config = {};

  getConfig(){
    return this.config;
  }

  appendCell(cell) {
    if (Array.isArray(cell)) {
      this.cells = this.cells.concat(cell);
    } else {
      this.cells.push(cell);
    }
  }

  getCells() {
    return this.cells;
  }
}

export default Report;
