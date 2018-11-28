import React from 'react';
import * as Utils from './utils'

function FilterButton(props) {
  const className = props.currentFilter == props.name ? "selected" : null;
  return (
    <li>
      <span
        className={className}
        onClick={() => props.onSelect(props.name)}
      >
        {props.name}
      </span>
    </li>
  );
}

export default class TodoFooter extends React.Component {
  render() {

    // don't render if no items
    if (this.props.items.length < 1) {
      return null;
    }

    const fun = (a, {completed: completed}) => completed ? a : a + 1
    const itemsLeft = this.props.items.reduce(fun, 0);
    const msg = `${itemsLeft} ${Utils.pluralize(itemsLeft, "item")} left`;

    return (
      <footer className="footer">
        <span className="todo-count">{msg}</span>
        <ul className="filters">
          <FilterButton
            name="All"
            currentFilter={this.props.currentFilter}
            onSelect={this.props.onFilter}
          />
          <FilterButton
            name="Active"
            currentFilter={this.props.currentFilter}
            onSelect={this.props.onFilter}
          />
          <FilterButton
            name="Completed"
            currentFilter={this.props.currentFilter}
            onSelect={this.props.onFilter}
          />
        </ul>
      </footer>
    );
  };
}
