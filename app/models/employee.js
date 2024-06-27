/* eslint-disable prettier/prettier */
import Model, { attr } from '@ember-data/model';

export default class EmployeeModel extends Model {
  @attr('string') employeeId;
  @attr('string') employeeName;
  @attr('string') employeeAddress;
  @attr('number') employeeSalary;
  @attr('string') employeeDesignation;
}
