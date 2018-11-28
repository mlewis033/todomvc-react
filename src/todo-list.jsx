import React from 'react';
import TodoItem from './todo-item';

export default class TodoList extends React.Component {
  render() {
    const listItems = this.props.items.map(item => <TodoItem item={item}/>);
    return (
      <ul className="todo-list">
        {listItems}
      </ul>
    );
  }
}
