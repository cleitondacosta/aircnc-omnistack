import React from 'react';
import { 
  BrowserRouter, 
  Switch, 
  Route
} from 'react-router-dom';

import Login from './pages/Login/Login.js';
import Profile from './pages/Profile/Profile.js';
import Spot from './pages/Spot/Spot.js';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/spot" component={Spot}/>
      </Switch>
    </BrowserRouter>
  );
}
