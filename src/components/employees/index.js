import React, { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage';
import Loading from '../loading';
import './Employees.scss';


const EMPLOYESS_API_URL = 'http://dummy.restapiexample.com/api/v1/employees';

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  async function fetchEmployees() {
    const res = await fetch(EMPLOYESS_API_URL);
    res.json()
      .then(employees => {
        const objEmployees = employees.data.map(employee => {
          const target = Object.assign({}, employee);
          target.favourite = false;
          return target;
        })
        return objEmployees;
      })
      .then(employees => setEmployees(employees))
      .catch(() => setErrorMessage(true))
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const favouriteHandler = (favouriteId) => {
    const targetEmployee = [...employees].map(target => {
      if (target.id === favouriteId) {
        target.favourite = !target.favourite;
      };
      return target;
    });
    setEmployees(targetEmployee);
  }
  
  const EmployeeItem = ({ employee }) => 
    <li 
      tabIndex={employee.id} 
      className={`employees-list-employee ${employee.favourite ? 'favourite' : ''}`}
    >
      <div className="employee-favourite">
        <button 
          onClick={(event) => favouriteHandler(event.target['id'])} 
          className="favourite-button" 
          key={employee.id} id={employee.id}
        >
          {employee.favourite ? 'Remove Favourite' : 'Favourite'}
        </button>
      </div>
      <div className="employee-name">
        {employee.employee_name}
      </div>
      <div className="employee-info">
        Age: {employee.employee_age} | Salary: $ {employee.employee_salary}
      </div>
    </li>;

  const EmployeesList = ({ employees = null }) => 
    employees && 
    employees.map(
      employee => <EmployeeItem key={employee.id} employee={employee} />
    );

  return (
    <>
      <div className="employees">
        <ul className="employees-list">
          <EmployeesList employees={employees} />
        </ul>
      </div>
      {!employees && <Loading />}
      {errorMessage && <ErrorMessage />}
    </>
  );
}

export default Employees;
