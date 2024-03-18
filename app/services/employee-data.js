import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class EmployeeDataService extends Service {
  @service store;

  async loadData() {
    let response = await fetch(
      'https://jd7ptn4xkln7nn3v2s6p6u7y2e0difsp.lambda-url.us-east-1.on.aws/'
    );

    let datas = await response.json();
    // console.log(datas);
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
    // return datas.map((emp) => {
    //   let existingEmployee = this.store.peekRecord('employee', emp.employeeId);
    //   if (!existingEmployee) {
    //     return this.store.createRecord('employee', {
    //       employeeId: emp.employeeId,
    //       employeeName: emp.employeeName,
    //       employeeAddress: emp.employeeAddress,
    //       employeeDesignation: emp.employeeDesignation,
    //       employeeSalary: emp.employeeSalary,
    //     });
    //   }
    //   return existingEmployee;
    // });
  }
}
