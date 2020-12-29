import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from "./BuildControl/BuildControl";
const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]
const BuildControls = ({ingredientAdded, ingredientRemoved, disabled, price, purchasable, ordered, isAuth}) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                            disabled={disabled[ctrl.type]}
                            key={ctrl.label}
                            label={ctrl.label}
                            added={ ingredientAdded.bind(this, ctrl.type)}
                            removed={ingredientRemoved.bind(this, ctrl.type)}/>
            })}
            <button
              disabled={!purchasable}
              className={classes.OrderButton}
              onClick={ordered}>{ isAuth ? 'ORDER NOW' : 'Sing up to order'}</button>
        </div>
    );
}

export default BuildControls;
