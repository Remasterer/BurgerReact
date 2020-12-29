import React from 'react';
import classes from './Order.module.css';
import Button from "../UI/Button/Button";
import { withRouter} from "react-router-dom";
const Order = ({ price, ingredients, deleteOrderHandler, id,  history}) => {
  const  transformedIngredients = [];
  for (const ingredientName in ingredients) {
    transformedIngredients.push(
      {
      name: ingredientName,
      amount: ingredients[ingredientName]
     }
    )
  }
  const ingredientOutput = transformedIngredients.map( ig => {
    return <span
            style={{
              textTransform: "capitalize",
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px'
            }}
      key={ig.name}>{ig.name} ({ig.amount})</span>
  })
  const orderDetailsHandler = () => {
    history.push(`${history.location.pathname}/${id}`)
  }
  return (
    <div className={classes.Order}>
        <div className="Order__info">
          <p>Ingredients: {ingredientOutput}</p>
          <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
        </div>
        <div className="Order__actions">
          <Button btnType="Success-type-2" clicked={orderDetailsHandler}>Details</Button>
          <Button btnType="Danger-type-2" clicked={deleteOrderHandler}>Delete</Button>
        </div>
    </div>
  )
}

export default withRouter(Order);
