class Component {
  constructor(target) {
    this.target = target;
  }

  setup() {}
  template() {}
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}

export default Component;
