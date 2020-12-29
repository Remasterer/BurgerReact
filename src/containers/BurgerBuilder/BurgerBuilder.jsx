import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from 'react-redux';
import * as actions from '../../store/actions'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
      this.props.onInitIngredients();
    }

  purchaseHandler = () => {
      if (this.props.isAuthenticated) {
        this.setState({purchasing: true})
      } else {
        this.props.onSetRedirectPath('/checkout');
        this.props.history.push('/auth');
      }
    }
    purchaseCancelHandler = () => {
      this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
      this.props.onInitPurchase();
      this.props.history.push({
        pathname: '/checkout',
      })
    }

    updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        .reduce(((sum, el) => {
          return sum + el;
        }), 0);
      return  sum > 0;
    }

    render() {
      let orderSummary = null;
      let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner /> ;

        const disabledInfo = {
            ...this.props.ing
        };

        for (let stateKey in disabledInfo) {
            disabledInfo[stateKey] = disabledInfo[stateKey] <= 0;
        }

        if (this.props.ing) {
          burger = (
            <Fragment>
              <Burger ingredients={this.props.ing}/>
              <BuildControls
                disabled={disabledInfo}
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemove}
                price={this.props.price}
                purchasable={this.updatePurchaseState(this.props.ing)}
                ordered={this.purchaseHandler}
                isAuth={this.props.isAuthenticated}/>
            </Fragment>
          );
          orderSummary = (
            <OrderSummary
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              ingredients={this.props.ing}
              totalSum={this.props.price}/>
          );
        }

        return (
            <Fragment>
              <Modal show={this.state.purchasing} modalCLose={this.purchaseCancelHandler}>
                { orderSummary }
              </Modal>
              { burger }
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemove: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
