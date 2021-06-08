import BaseComponent from '../utils/BaseComponent';

export default class ActiveCounter extends BaseComponent {
  constructor(props) {
    super(props);
    this.element = this.props.parent.querySelector('.todos-counter__cnt');
    this.element.textContent = this.props.count;
  }
}
