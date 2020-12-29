import React, {Component, Suspense, lazy} from 'react';
import  { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Logout/Logout";
import * as actions from './store/actions/index';
import { connect } from "react-redux";

const Auth = lazy(() => import('./containers/Auth/Auth'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/burger" component={ BurgerBuilder } />
        <Route path="/auth" render={() => <Suspense fallback={<div>Loading</div>}><Auth /></Suspense>} />
        <Route path="/checkout"  render={() => <Suspense fallback={<div>Loading</div>}><Checkout /></Suspense>}  />
        <Route path="/logout" component={ Logout } />
        <Redirect to="/burger" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/burger" component={ BurgerBuilder } />
          <Route path="/auth" render={() => <Suspense fallback={<div>Loading</div>}><Auth /></Suspense>} />
          <Route path="/checkout"  render={() => <Suspense fallback={<div>Loading</div>}><Checkout /></Suspense>}  />
          <Route path="/orders" render={() => <Suspense fallback={<div>Loading</div>}><Orders /></Suspense>} />
          <Route path="/logout" component={ Logout } />
          <Redirect  to="/burger" />
        </Switch>
      );
    }
        return (
            <div>
                <Layout>
                  {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
