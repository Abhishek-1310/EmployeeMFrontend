import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class EmployeeInfoComponent extends Component {
  @tracked isExpand = false;
  @service store;

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
      console.log('inside try block');
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(response);
        this.store.unloadRecord(employee);
      } else {
        throw new Error(`Error deleting employee: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // @action
  // async deleteEmployee(employee) {
  //   console.log('delete');
  //   console.log(employee.employeeId);
  //   const employeeId = employee.employeeId;
  //   const url = `https://kfcvq64eeg.execute-api.us-east-1.amazonaws.com/dev/employee/${employeeId}`;
  //   try {
  //     console.log('inside try block');
  //     const response = await fetch(url, {
  //       method: 'DELETE',
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       const employee = this.store.peekRecord('employee', employeeId);
  //       console.log(' inside delete');
  //       console.log(employee);
  //       // await this.employeeData.loadData();
  //       // Ember.run.once(this, 'rerender');
  //       this.rerender();
  //       if (employee) {
  //         employee.unloadRecord();
  //       }
  //       await this.store.save();
  //     } else {
  //       throw new Error(`Error deleting employee: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  @action
  handleUpdate() {
    console.log('update');
  }
}
