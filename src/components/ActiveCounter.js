export default class ActiveCounter {
  element;
  props;

  constructor(props) {
    this.props = props;
    this.element = this.props.parent.querySelector('.todos-counter__cnt');
    this.element.textContent = this.props.count;
  }
}
