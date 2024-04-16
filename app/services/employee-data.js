import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class EmployeeDataService extends Service {
  @service store;

  async loadData() {
    let response = await fetch(
      'https://jd7ptn4xkln7nn3v2s6p6u7y2e0difsp.lambda-url.us-east-1.on.aws/'
    );

    let datas = await response.json();
    let allEmployees = this.store.peekAll('employee');
    allEmployees.forEach((employee) => {
      if (!datas.find((emp) => emp.employeeId === employee.employeeId)) {
        employee.unloadRecord();
      }
    });
    return datas.map((emp) => {
      let existingEmployee = this.store.peekRecord('employee', emp.employeeId);
      if (existingEmployee) {
        existingEmployee.setProperties({
          employeeName: emp.employeeName,
          employeeAddress: emp.employeeAddress,
          employeeDesignation: emp.employeeDesignation,
          employeeSalary: emp.employeeSalary,
        });
      } else {
        return this.store.createRecord('employee', {
          employeeId: emp.employeeId,
          employeeName: emp.employeeName,
          employeeAddress: emp.employeeAddress,
          employeeDesignation: emp.employeeDesignation,
          employeeSalary: emp.employeeSalary,
        });
      }
      return existingEmployee;
    });
  }

  async createEmployee(employee) {
    console.log(employee);
    try {
      let response = await fetch(
        'https://qudjoggbekw62q7siatj73o4p40uukaw.lambda-url.us-east-1.on.aws/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log('Data posted successfully');
        return true;
      } else {
        console.error('response is not ok');
        return false;
      }
    } catch (error) {
      console.error('Error posting data', error);
      return false;
    }
  }
}
