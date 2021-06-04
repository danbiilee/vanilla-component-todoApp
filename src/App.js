import * as api from '@db/localStorage';
import AddTodo from '@components/AddTodo';
import TodoItem from '@components/TodoItem';

export default class App {
	element;
	state;

	constructor() {
		this.element = document.querySelector('.todos');
		this.state = api.getTodos() ?? [];

		this.setEventListener();
		new AddTodo({ onAddTodo: this.onAddTodo.bind(this) });
	}

	render() {
		// 카테고리별 카운트 셋팅
		const activeTodos = this.state.filter(todo => !todo.complete);
		const completeTodos = this.state.filter(todo => todo.complete);
		const activeCnt = document.querySelector('.active .todos-counter__cnt');
		const completeCnt = document.querySelector('.complete .todos-counter__cnt');
		activeCnt.innerHTML = activeTodos.length;
		completeCnt.innerHTML = completeTodos.length;

		// 리스트 셋팅
		this.element.innerHTML = '';
		activeTodos.concat(completeTodos).forEach(todo => {
			new TodoItem({
				parent: this.element,
				todo,
				onChange: this.onPressEditInput.bind(this),
			});
		});
	}

	setState(newState) {
		this.state = newState;
	}

	setEventListener() {
		this.element.addEventListener('click', this.onToggleCheck.bind(this)); // 완료 여부 토글
		this.element.addEventListener('click', this.onDeleteTodo.bind(this)); // 할 일 하나 삭제
		this.element.addEventListener('click', this.onClickEditButton.bind(this)); // 타이틀 수정

		const toggleComplete = document.querySelector(
			'.complete .todos-counter__title'
		);
		toggleComplete.addEventListener(
			'click',
			this.onToggleCompleteTodos.bind(this)
		); // 완료된 할 일 보이기

		const delAllBtn = document.querySelector('.btn.delete-all');
		delAllBtn.addEventListener('click', this.onDeleteCompleteTodos.bind(this)); // 완료된 할 일 전체 삭제
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
