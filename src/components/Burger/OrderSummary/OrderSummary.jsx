import React, {Component, Fragment} from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[OrderSummary] did update');
  }

  render() {
    const ingredientSummary =  Object.keys(this.props.ingredients)
      .map((igKey )=> {
        return (
          <li key={ igKey }>
            <span style={{textTransform: 'capitalize'}}>{igKey}:</span> {this.props.ingredients[igKey]}
          </li>);
      });
    return (
      <Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total sum: <strong>{this.props.totalSum.toFixed(2)}</strong></p>
        <p> Continue to checkout ? </p>
        <Button clicked={this.props.purchaseCancelled} btnType="Danger">Cancel</Button>
        <Button clicked={this.props.purchaseContinue} btnType="Success">Contunie</Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
