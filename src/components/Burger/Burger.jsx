import React from 'react';
import  classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = ({ingredients}) => {
    let transformedIngredients = Object.entries(ingredients)
        .map((igKey) => {
            return [...Array(igKey[1])].map((_, index) => {
                return  <BurgerIngredient key={igKey + index} type={igKey[0]}/>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>There is no ingridients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;
