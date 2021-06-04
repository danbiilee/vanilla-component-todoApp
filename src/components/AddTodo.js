export default class AddTodo {
	element;
	state;
	props;

	constructor(props) {
		this.element = document.querySelector('.add-section__input');
		this.state = this.element.value;
		this.props = props;

		this.setEventListener();
	}

	setState(newState) {
		this.state = newState;
	}

	render() {}

	setEventListener() {
		const toggleBtn = document.querySelectorAll('.btn.toggle');
		const addBtn = document.querySelector('.btn.add');

		toggleBtn.forEach(item =>
			item.addEventListener('click', this.onToggleAddTodo.bind(this))
		);
		this.element.addEventListener('keyup', this.onChange.bind(this));
		addBtn.addEventListener('click', this.onChange.bind(this));
	}

	onChange({ type, key }) {
		if (key === 'Escape') {
			this.onToggleAddTodo();
			return;
		}
		if (key === 'Enter' || type === 'click') {
			this.setState(this.element.value);
			this.props.onAddTodo({ target: this, title: this.state });
		}
	}

	onToggleAddTodo() {
		const main = document.querySelector('main');

		this.element.value = '';
		main.classList.toggle('add-on');

		if (main.className.includes('add-on')) {
			this.element.focus();
		}
	}
}
