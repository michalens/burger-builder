import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	}

	addIngredientHandler = (type) => {
		debugger;
		this.setState((currentState) => {
			let newstate = currentState.ingredients;
			newstate[type]++;
			let newPrice = currentState.totalPrice;
			newPrice = newPrice + INGREDIENT_PRICES[type];
			return { ingredients: newstate, totalPrice: newPrice}
		})
	}

	removeIngredientHandler = (type) => {
		this.setState((currentState) => {
			const newstate = currentState.ingredients;
			if (newstate[type] <= 0) {
				return;
			}
			newstate[type]--
			let newPrice = currentState.totalPrice;
			newPrice = newPrice - INGREDIENT_PRICES[type];
			return { ingredients: newstate, totalPrice: newPrice}
		})
	}

	render() {
		const disabledInfo = {...this.state.ingredients};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
					add={this.addIngredientHandler}
					remove={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
				/>
			</>
		);
	}
}

export default BurgerBuilder;