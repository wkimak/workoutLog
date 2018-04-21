import React from 'React';
import { Route, Redirect } from 'react-router-dom';


export const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    cb();
  },
  signout(cb) {
    this.isAuthenticated = false
    cb();
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={ () => (
   auth.isAuthenticated === true ?
    <Component />
    : <Redirect to='/login' /> 
  )} />
)

