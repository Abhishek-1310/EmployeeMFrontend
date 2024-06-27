import EmberRouter from '@ember/routing/router';
import config from 'employee-managment/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('employees');
  this.route('home', { path: '/' });
  this.route('about');
  this.route('contact');
  this.route('create-employee');
  this.route('updateEmployee');
});
