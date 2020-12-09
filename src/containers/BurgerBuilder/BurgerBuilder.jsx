import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const  INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
      axios.get('https://buegerreact.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({ingredients: response.data})
        }).catch(error => {
          this.setState({error: true});
      })
    }

  addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
      this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(!oldCount) return;
        const updateCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        console.log(updatedIngredients)
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
      this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
      this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
      this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
      let search = [];
      for (const ingredient in this.state.ingredients) {
        search.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(this.state.ingredients[ingredient])}`)
      }
      search.push('price=' + this.state.totalPrice)
      search = search.join('&');
      this.setState({loading: true});
      this.props.history.push({
        pathname: '/checkout',
        search: `?${search}`
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
      this.setState({purchasable: sum > 0})

    }

    render() {
      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner /> ;

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let stateKey in disabledInfo) {
            disabledInfo[stateKey] = disabledInfo[stateKey] <= 0;
        }

        if (this.state.loading) {
          orderSummary = <Spinner />;
        }

        if (this.state.ingredients) {
          burger = (
            <Fragment>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls
                disabled={!disabledInfo}
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Fragment>
          );
          orderSummary = (
            <OrderSummary
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              ingredients={this.state.ingredients}
              totalSum={this.state.totalPrice}/>
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

export default  withErrorHandler(BurgerBuilder, axios);
