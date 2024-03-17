import EmberRouter from '@ember/routing/router';
import config from 'employee-managment/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('employees', { path: '/' });
  this.route('home');
  this.route('about');
  this.route('contact');
});
