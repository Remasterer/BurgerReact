import React, {Fragment, Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Sidedrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  siteDrawCloseHandler = () => {
    this.setState({ showSideDrawer: false})
  }
  siteDrawToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    });
  }
  render() {
    return (
      <Fragment>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.siteDrawCloseHandler}/>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggleSideDrawer={this.siteDrawToggleHandler}/>
        <div>Toolbar,SideDrawer,BackDrop</div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapStateToProps)(Layout);
