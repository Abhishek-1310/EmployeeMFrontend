import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | updateEmployee', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:update-employee');
    assert.ok(route);
  });
});
