import React, { Component } from 'react';

class EmployeeForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { firstName, lastName, email } = this.state;
    const { onAdd } = this.props;

    // Call the create API here
    onAdd({
      firstName,
      lastName,
      email,
    });

    this.setState({ firstName: '', lastName: '', email: '' });
  };

  render() {
    const { firstName, lastName, email } = this.state;

    return (
      <div>
        <h2>Add Employee</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}

export default EmployeeForm;
