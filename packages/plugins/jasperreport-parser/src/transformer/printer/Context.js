class Context {
  constructor(parameterName, detailName, metadata) {
    this.parameterName = parameterName;
    this.detailName = detailName;
    this.metadata = metadata;
  }

  getParameterName() {
    return this.parameterName;
  }

  getDetailName() {
    return this.detailName;
  }

  getMetadata() {
    return this.metadata;
  }
}

export default Context;
