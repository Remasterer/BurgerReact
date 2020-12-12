import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //   axios.get('https://buegerreact.firebaseio.com/ingredients.json')
    //     .then(response => {
    //       this.setState({ingredients: response.data})
    //     }).catch(error => {
    //       this.setState({error: true});
    //   })
    // }
    purchaseHandler = () => {
      this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
      this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
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
      let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner /> ;

        const disabledInfo = {
            ...this.props.ing
        };

        for (let stateKey in disabledInfo) {
            disabledInfo[stateKey] = disabledInfo[stateKey] <= 0;
        }

        if (this.state.loading) {
          orderSummary = <Spinner />;
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
                ordered={this.purchaseHandler}/>
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
    ing: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
    onIngredientRemove: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
  };
};
export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
