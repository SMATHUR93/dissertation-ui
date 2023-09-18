import React, { Component } from 'react';

class EmployeeItem extends Component {
  state = {
    isEditing: false,
    updatedFirstName: '',
    updatedLastName: '',
    updatedEmail: '',
  };

  handleEdit = () => {
    const { employee } = this.props;
    this.setState({
      isEditing: true,
      updatedFirstName: employee.firstName,
      updatedLastName: employee.lastName,
      updatedEmail: employee.email,
    });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleUpdate = () => {
    const { onUpdate, employee } = this.props;
    const { updatedFirstName, updatedLastName, updatedEmail } = this.state;

    // Call the update API here
    onUpdate(employee.id, {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
    });

    this.setState({ isEditing: false });
  };

  render() {
    const { employee, onDelete } = this.props;
    const { isEditing, updatedFirstName, updatedLastName, updatedEmail } = this.state;

    return (
      <li>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={updatedFirstName}
              onChange={(e) => this.setState({ updatedFirstName: e.target.value })}
            />
            <input
              type="text"
              value={updatedLastName}
              onChange={(e) => this.setState({ updatedLastName: e.target.value })}
            />
            <input
              type="text"
              value={updatedEmail}
              onChange={(e) => this.setState({ updatedEmail: e.target.value })}
            />
            <button onClick={this.handleUpdate}>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <span>
              {employee.firstName} {employee.lastName}, {employee.email}
            </span>
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={() => onDelete(employee.id)}>Delete</button>
          </div>
        )}
      </li>
    );
  }
}

export default EmployeeItem;
