/* eslint-disable prettier/prettier */
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class CreateEmployeeController extends Controller {
  @service employeeData;
  @service router;
  employeeId = '';
  employeeName = '';
  employeeAddress = '';
  employeeSalary = '';
  employeeDesignation = '';

  @tracked isSuccess = false;
  @tracked errorMessage = '';

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
  async createEmployee(event) {
    event.preventDefault();

    let newEmployee = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      employeeAddress: this.employeeAddress,
      employeeSalary: this.employeeSalary,
      employeeDesignation: this.employeeDesignation,
    };
    try {
      const response = await this.employeeData.createEmployee(newEmployee);
      console.log(response);
      this.isSuccess = true;
    } catch (error) {
      console.error('Error posting data', error);
    } finally {
      console.log('hello');
      this.setProperties({
        employeeId: '',
        employeeName: '',
        employeeAddress: '',
        employeeSalary: '',
        employeeDesignation: '',
      });
    }
  }
}
