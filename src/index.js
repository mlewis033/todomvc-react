import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoItem from './todo-item';
import TodoFooter from './todo-footer'
import * as Utils from './utils'

function TodoList(props) {
  const listItems = props.items.map(item =>
    <TodoItem
      item={item}
      onDestroy={() => props.onDestroy(item.id)}
      onToggle={() => props.onToggle(item.id)}
    />
  );

  return (
    <ul className="todo-list">
      {listItems}
    </ul>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
      items: [ ],
      currentFilter: "All",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleChange(e) {
    this.setState({newTodo: e.target.value});
  }

  handleKeydown(e) {
    if (e.keyCode !== 13) { // not enter key
      return;
    }
    e.preventDefault();
    var itemText = this.state.newTodo.trim();
    if (itemText) {
      const item = { text: itemText, completed: false, id: Utils.uuid() };
      this.setState(state => ({
        items: state.items.concat(item),
        newTodo: ""
      }));
    }
  }

  handleDestroy(destroyId) {
    const items = this.state.items.filter((item) => item.id !== destroyId);
    this.setState({items: items});
  }

  handleToggle(toggleId) {
    const items = this.state.items.map((item) => {
      return (item.id === toggleId) ?
        {...item, completed: !item.completed} : // toggle completed
        item
    });
    this.setState({items: items});
  }

  handleFilter(filter) {
    this.setState({currentFilter: filter});
  }

  getFilteredItems() {
    return this.state.items.filter((item) => {
      switch (this.state.currentFilter) {
      case "Active":
        return item.completed === false;
      case "Completed":
        return item.completed === true;
      default:
        return true;
      }
    });
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.handleKeydown}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </header>
          <TodoList
            items={this.getFilteredItems()}
            onDestroy={this.handleDestroy}
            onToggle={this.handleToggle}
          />
          <TodoFooter
            items={this.state.items}
            currentFilter={this.state.currentFilter}
            onFilter={this.handleFilter}
          />
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
