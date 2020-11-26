import React, {Fragment, Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Sidedrawer/SideDrawer";


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
          open={this.state.showSideDrawer}
          closed={this.siteDrawCloseHandler}/>
        <Toolbar toggleSideDrawer={this.siteDrawToggleHandler}/>
        <div>Toolbar,SideDrawer,BackDrop</div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;
