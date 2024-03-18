import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class EmployeeInfoComponent extends Component {
  @tracked isExpand = false;

  @action
  handleClick() {
    this.isExpand = !this.isExpand;
  }
}
