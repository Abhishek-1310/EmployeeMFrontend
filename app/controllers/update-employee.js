import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UpdateEmployeeController extends Controller {
  @service employeeData;
  @service router;
  employeeId = '';
  employeeName = '';
  employeeAddress = '';
  employeeSalary = '';
  employeeDesignation = '';

  @action
  updateEmployeeId(event) {
    this.employeeId = event.target.value;
  }
  @action
  updateEmployeeName(event) {
    this.employeeName = event.target.value;
  }
  @action
  updateEmployeeAddress(event) {
    this.employeeAddress = event.target.value;
  }

  @action
  updateEmployeeSalary(event) {
    this.employeeSalary = event.target.value;
  }
  @action
  updateEmployeeDesignation(event) {
    this.employeeDesignation = event.target.value;
  }
  @action
  async updateEmployee(event) {
    event.preventDefault();

    let newEmployee = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      employeeAddress: this.employeeAddress,
      employeeSalary: this.employeeSalary,
      employeeDesignation: this.employeeDesignation,
    };
    await this.employeeData.updateEmployee(newEmployee);
  }
}
