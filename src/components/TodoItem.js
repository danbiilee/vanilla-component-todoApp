import BaseComponent from '../utils/BaseComponent';

export default class TodoItem extends BaseComponent {
  constructor(props) {
    super(props);

    const { todo, onChange } = this.props;
    const template = document.createElement('template');
    template.innerHTML = `<li class="todo">
      <button class="btn check">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <path />
        </svg>
      </button>
      <span class="todo__title"></span>
      <input class="todo__input" name="title" />
      <div class="todo__buttons">
        <button class="btn edit">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
          </svg>
        </button>
        <button class="btn delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z" />
          </svg>
        </button>
      </div>
    </li>`;

    this.element = template.content.firstElementChild;
    this.element.classList.add(todo.complete ? 'complete' : 'incomplete');
    this.element.dataset.id = todo.id;

    const checkPath = this.element.querySelector('.btn.check path');
    checkPath.setAttribute(
      'd',
      todo.complete
        ? 'M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z'
        : 'M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z'
    );

    const titleElement = this.element.querySelector('.todo__title');
    titleElement.textContent = todo.title;

    const inputElement = this.element.querySelector('.todo__input');
    inputElement.setAttribute('value', todo.title);
    inputElement.addEventListener('keydown', onChange);

    const grayButtons = [
      this.element.querySelector('.btn.edit'),
      this.element.querySelector('.btn.delete'),
    ];
    todo.complete &&
      grayButtons.forEach(button => button.classList.add('gray'));

    this.appendTo();
  }
}
