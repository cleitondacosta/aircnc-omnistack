import React from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator 
} from 'react-navigation';

import Login from './pages/Login/Login';
import Spot from './pages/Spot/Spot';
import Book from './pages/Book/Book';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Spot,
    Book,
  })
);

export default Routes;
