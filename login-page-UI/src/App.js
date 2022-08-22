import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// F:\full_stack\login-page\node_modules\bootstrap\dist\css\bootstrap.min.css
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { Route, Switch, } from "react-router-dom";

import { useState } from 'react';
import Forgot from './components/forgotpage/forgot';
import Varify from './components/varify/varify';
function App() {

  const [user, setLoginUser] = useState({})

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}
        </Route>
        <Route exact path="/login"><Login setLoginUser={setLoginUser} /> </Route>
        <Route exact path="/register"><Register /> </Route>
        <Route exact path="/forgot"> <Forgot /> </Route>
        <Route exact path="/varify"><Varify/></Route>
      </Switch>
    </>
  );
}

export default App;
