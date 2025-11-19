import EmberRouter from '@ember/routing/router';
import config from '../config/environment';
const Router = EmberRouter.extend({ location: config.locationType });
Router.map(function(){ this.route('room',{ path: '/:room' }); });
export default Router;
