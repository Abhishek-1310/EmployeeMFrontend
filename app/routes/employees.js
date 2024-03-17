import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EmployeesRoute extends Route {
  @service store;
  @service employeeData;

  async model() {
    await this.employeeData.loadData();
    return this.store.peekAll('employee');
  }
}
