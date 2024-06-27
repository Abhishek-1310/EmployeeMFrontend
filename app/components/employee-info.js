import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class EmployeeInfoComponent extends Component {
  @tracked isExpand = false;

  @action
  handleClick() {
    this.isExpand = !this.isExpand;
  }

  @action
  async deleteEmployee(employee) {
    console.log('delete');
    console.log(employee.employeeId);
    const employeeId = employee.employeeId;
    const url = `https://kfcvq64eeg.execute-api.us-east-1.amazonaws.com/dev/employee/${employeeId}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.ok) {
        // Delete the record from the store
        const employee = this.store.peekRecord('employee', employeeId);
        if (employee) {
          console.log('data deleted');
          employee.unloadRecord();
        }
      } else {
        throw new Error(`Error deleting employee: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  @action
  handleUpdate() {
    console.log('update');
  }
}
