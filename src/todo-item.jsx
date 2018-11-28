import React from 'react';

export default class TodoItem extends React.Component {
  render() {
    const isCompleted = this.props.item.completed;
    const className = isCompleted ? "completed" : "";

    return (
      <li key={this.props.item.id} className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={isCompleted}
            onChange={this.props.onToggle}
          />
          <label>{this.props.item.text}</label>
          <button className="destroy" onClick={this.props.onDestroy}/>
        </div>
      </li>
    );
  }
}
