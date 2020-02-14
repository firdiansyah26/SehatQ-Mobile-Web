import asyncComponent from './utils/AsyncFunc';
import withTracker from './config/withTracker'

const routers = [
  {
    path: 'home',
    exact: true,
    component: withTracker(asyncComponent(() => import('./routes/UI/Home/index')))
  },
  {
    path: 'dashboard',
    exact: true,
    component: withTracker(asyncComponent(() => import('./routes/dashboard/Dashboard')))
  },
  {
    path: 'cek',
    exact: true,
    component: withTracker(asyncComponent(() => import('./routes/master/Master')))
  },
  {
    path: 'balik',
    exact: true,
    component: withTracker(asyncComponent(() => import('./routes/Coba/Coba')))
  },
  {
    path: 'maintain',
    label: 'Maintain',
  },
];
export default routers;
