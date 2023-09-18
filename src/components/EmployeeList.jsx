import React, { Component } from 'react';
import EmployeeItem from './EmployeeItem';

class EmployeeList extends Component {
  render() {
    const { employees, onDelete, onUpdate } = this.props;

    return (
      <div>
        <h2>Employee List</h2>
        <ul>
          {employees.map((employee) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default EmployeeList;
