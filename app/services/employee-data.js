/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import { inject as service } from '@ember/service';
// import employee from '../models/employee';
export default class EmployeeDataService extends Service {
  @service store;

  async loadData() {
    const response = await fetch(
      'https://wp24fcebktgpgxra2ebjqbppai0zgoch.lambda-url.us-east-1.on.aws/'
    );
    const datas = await response.json();
    console.log(datas);
    this.store.unloadAll('employee');

    datas.map((emp) => {
      console.log(emp.id);
      console.log(typeof emp.employeeId);
      return this.store.createRecord('employee', {
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        employeeAddress: emp.employeeAddress,
        employeeDesignation: emp.employeeDesignation,
        employeeSalary: emp.employeeSalary,
      });
    });
  }

  async createEmployee(employee) {
    console.log(employee);
    try {
      let response = await fetch(
        'https://wsca2bccmjjguuzmmx2ywafwya0pahju.lambda-url.us-east-1.on.aws/',
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

  async updateEmployee(employee) {
    console.log(employee);
    try {
      let response = await fetch(
        'https://kfcvq64eeg.execute-api.us-east-1.amazonaws.com/dev/employee',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        }
      );
      console.log(response);
      console.log('yes');
      if (response.ok) {
        console.log('Data updated  successfully');
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
