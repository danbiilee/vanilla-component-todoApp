export default class BaseComponent {
  element;
  state;
  props;

  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    this.state = newState;
  }

  appendTo() {
    this.props.parent.appendChild(this.element);
  }
}
