import * as api from '@db/localStorage';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import ActiveCounter from './components/ActiveCounter';
import CompleteContainer from './components/CompleteContainer';
import BaseComponent from './utils/BaseComponent';

export default class App extends BaseComponent {
  constructor() {
    super();
    this.element = document.querySelector('.todos');
    this.state = api.getTodos() ?? [];
    this.setEventListener();
  }

  render() {
    // 카테고리별 카운터 렌더링
    const activeTodos = this.state.filter(todo => !todo.complete);
    const completeTodos = this.state.filter(todo => todo.complete);
    new ActiveCounter({
      parent: document.querySelector('.todos-counter.active'),
      count: activeTodos.length,
    });
    new CompleteContainer({
      count: completeTodos.length,
      onToggle: this.onToggleCompleteTodos.bind(this),
      onDelete: this.onDeleteCompleteTodos.bind(this),
    });

    // 리스트 렌더링
    this.element.innerHTML = '';
    activeTodos.concat(completeTodos).forEach(todo => {
      new TodoItem({
        parent: this.element,
        todo,
        onChange: this.onPressEditInput.bind(this),
      });
    });
  }

  setEventListener() {
    new AddTodo({ onAddTodo: this.onAddTodo.bind(this) });
    this.element.addEventListener('click', this.onToggleCheck.bind(this)); // 완료 여부 토글
    this.element.addEventListener('click', this.onDeleteTodo.bind(this)); // 할 일 하나 삭제
    this.element.addEventListener('click', this.onClickEditButton.bind(this)); // 타이틀 수정
  }

  onPressEditInput({ key, target }) {
    if (key !== 'Escape' && key !== 'Enter') {
      return;
    }

    const liElement = target.closest('.todo');
    const id = parseInt(liElement.dataset.id, 10);

    if (key === 'Escape') {
      target.value = this.state.find(todo => todo.id === id).title;
    } else if (key === 'Enter') {
      this.onChangeTitle({
        id,
        title: target.value,
      });
    }

    liElement.classList.toggle('edit-on');
  }

  onClickEditButton({ target }) {
    const button = target.closest('.btn.edit');
    if (!button) {
      return;
    }

    const liElement = target.closest('.todo');
    const inputElement = liElement.querySelector('.todo__input');

    liElement.classList.toggle('edit-on');

    // 타이틀 수정 영역 보이기
    if (liElement.className.includes('edit-on')) {
      inputElement.focus();
      return;
    }

    // 타이틀 변경
    this.onChangeTitle({
      id: parseInt(liElement.dataset.id, 10),
      title: inputElement.value,
    });
  }

  onChangeTitle({ id, title }) {
    // 비교
    const diff = this.state.find(todo => todo.id === id).title === title;
    if (diff) {
      return;
    }

    // 이전 값과 다를 때만 변경
    this.setState(api.editTodo({ id, title }));
    this.render();
  }

  onDeleteTodo({ target }) {
    const button = target.closest('.btn.delete');
    if (!button) {
      return;
    }

    const liElement = target.closest('.todo');
    this.setState(api.deleteTodo(parseInt(liElement.dataset.id, 10)));
    this.render();
  }

  onDeleteCompleteTodos() {
    this.setState(api.deleteCompleteTodos());
    this.render();
  }

  onToggleCompleteTodos() {
    this.element.classList.toggle('display');
  }

  onToggleCheck({ target }) {
    const button = target.closest('.btn.check');
    if (!button) {
      return;
    }

    const liElement = target.closest('.todo');
    this.setState(api.toggleTodo(parseInt(liElement.dataset.id, 10)));
    this.render();
  }

  onAddTodo({ target, title }) {
    if (!title) {
      alert('⚠ 할 일을 입력해주세요 ⚠');
      target.element.focus();
      return;
    }

    let id;
    if (this.state.length > 0) {
      // id: Max 값 찾기
      id =
        this.state.reduce((prev, cur) => {
          return Math.max(prev, cur.id);
        }, 0) + 1;
    } else {
      id = 0;
    }

    target.onToggleAddTodo();
    this.setState(api.addTodo({ id, title, complete: false }));
    this.render();
  }
}
