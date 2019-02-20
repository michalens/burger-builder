import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState = () => {
		this.setState(currentState => {
		const sum = Object.keys(currentState.ingredients)
					.map(igKey => currentState.ingredients[igKey])
					.reduce((acc, num) => acc+num)
		return { purchasable: sum > 0 }
		})
	}

	addIngredientHandler = type => {
		this.setState(currentState => {
			let newstate = currentState.ingredients;
			newstate[type]++;
			let newPrice = currentState.totalPrice;
			newPrice = newPrice + INGREDIENT_PRICES[type];
			return { ingredients: newstate, totalPrice: newPrice}
		})
		this.updatePurchaseState();
	}

	removeIngredientHandler = type => {
		this.setState(currentState => {
			const newstate = currentState.ingredients;
			if (newstate[type] <= 0) {
				return;
			}
			newstate[type]--
			let newPrice = currentState.totalPrice;
			newPrice = newPrice - INGREDIENT_PRICES[type];
			return { ingredients: newstate, totalPrice: newPrice}
		})
		this.updatePurchaseState();
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		alert('You continue!')
	}

	render() {
		const disabledInfo = {...this.state.ingredients};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<> 
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
						ingredients={this.state.ingredients} 
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
					add={this.addIngredientHandler}
					remove={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</>
		);
	}
}

export default BurgerBuilder;