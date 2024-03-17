import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class EmployeeDataService extends Service {
  @service store;

  async loadData() {
    let response = await fetch(
      'https://jd7ptn4xkln7nn3v2s6p6u7y2e0difsp.lambda-url.us-east-1.on.aws/'
    );
    console.log(response);
    let datas = await response.json();
    console.log(datas);

    return datas.data.map((emp) => {
      let existingEmployee = this.store.peekRecord('employee', emp.employeeId);
      if (!existingEmployee) {
        return this.store.createRecord('employee', {
          employeeId: emp.employeeId,
          employeeName: emp.employeeName,
          employeeAddress: emp.employeeAddress,
          employeeDesignation: emp.employeeDesignation,
        });
      }
      return existingEmployee;
    });
  }
}
