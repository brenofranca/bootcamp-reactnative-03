import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './pages/Home';
import Issues from './pages/Issues';

const Routes = createAppContainer(
  createSwitchNavigator({
    Issues,
    Home,
  }),
);

export default Routes;
