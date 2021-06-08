import CompleteCounter from './CompleteCounter';

export default class CompleteContainer {
  element;
  props;

  constructor(props) {
    this.props = props;
    this.element = document.querySelector('.todos-counter.complete');
    new CompleteCounter({
      parent: this.element,
      count: this.props.count,
    });
    this.setEventListener();
  }

  setEventListener() {
    const { onToggle, onDelete } = this.props;
    const titleElement = this.element.querySelector('.todos-counter__title');
    titleElement.addEventListener('click', onToggle); // 완료된 할 일 보이기

    const delAllBtn = this.element.querySelector('.btn.delete-all');
    delAllBtn.addEventListener('click', onDelete); // 완료된 할 일 전체 삭제
  }
}
