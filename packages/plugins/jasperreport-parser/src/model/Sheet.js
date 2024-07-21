class Sheet {
  cells = [];

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setOrientation(orientation) {
    this.orientation = orientation;
  }

  getOrientation() {
    return this.orientation;
  }

  setMarginLeft(marginLeft) {
    this.marginLeft = marginLeft;
  }

  getMarginLeft() {
    return this.marginLeft;
  }

  setMarginRight(marginRight) {
    this.marginRight = marginRight;
  }

  getMarginRight() {
    return this.marginRight;
  }

  setMarginTop(marginTop) {
    this.marginTop = marginTop;
  }

  getMarginTop() {
    return this.marginTop;
  }

  setMarginBottom(marginBottom) {
    this.marginBottom = marginBottom;
  }

  getMarginBottom() {
    return this.marginBottom;
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

  setZoom(zoom) {
    this.zoom = zoom;
  }

  getZoom() {
    return this.zoom;
  }
}

export default Sheet;
