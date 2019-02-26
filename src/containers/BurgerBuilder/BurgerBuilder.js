import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error:false
	}

	componentDidMount() {
		axios.get('https://burger-builder-3ecd8.firebaseio.com/ingredients.json')
			.then(resp => {
				this.setState({ingredients: resp.data})
			})
			.catch(err => {
				this.setState({error:true})
			} )
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
		// this.setState({loading: true})
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Mike',
		// 		address: {
		// 			street: 'TestStreet 1',
		// 			zipCode: '101',
		// 			country: 'Cameroon',
		// 		},
		// 		email: "test@test.com"
		// 	},
		// 	deliveryMethod: 'fastest'
		// }
		// axios.post('/orders.json', order)
		// 	.then(response => {
		// 		this.setState({loading: false, purchasing: false})	
		// 	})
		// 	.catch(err => {
		// 		this.setState({loading: false, purchasing: false})	
		// 	})
		const queryParams = []
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	}

	render() {
		const disabledInfo = {...this.state.ingredients};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
		if (this.state.ingredients){
			burger = (<>
						<Burger ingredients={this.state.ingredients}/>
						<BuildControls 
							add={this.addIngredientHandler}
							remove={this.removeIngredientHandler}
							disabled={disabledInfo}
							price={this.state.totalPrice}
							purchasable={this.state.purchasable}
							ordered={this.purchaseHandler}
						/>
					</>);
			orderSummary = <OrderSummary 
						ingredients={this.state.ingredients} 
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
		}
		if (this.state.loading) {
			orderSummary = <Spinner />
		}
		return (
			<> 
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);