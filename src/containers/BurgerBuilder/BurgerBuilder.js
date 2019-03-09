import React, {Component} from 'react';
import {connect} from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import axios from '../../axios-orders'
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error:false
	}

	componentDidMount() {
		// axios.get('https://burger-builder-3ecd8.firebaseio.com/ingredients.json')
		// 	.then(resp => {
		// 		this.setState({ingredients: resp.data})
		// 	})
		// 	.catch(err => {
		// 		this.setState({error:true})
		// 	} )
	}

	updatePurchaseState = () => {
		const sum = Object.keys(this.props.ings)
					.map(igKey => this.props.ings[igKey])
					.reduce((acc, num) => acc+num)
		return sum > 0;

	}

	
	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = {...this.props.ings};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
		if (this.props.ings){
			burger = (<>
						<Burger ingredients={this.props.ings}/>
						<BuildControls 
							add={this.props.onIngredientAdded}
							remove={this.props.onIngredientRemoved}
							disabled={disabledInfo}
							price={this.props.price}
							purchasable={this.updatePurchaseState()}
							ordered={this.purchaseHandler}
						/>
					</>);
			orderSummary = <OrderSummary 
						ingredients={this.props.ings} 
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.props.price}
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


const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ing => dispatch(burgerBuilderActions.addIngredient(ing)),
		onIngredientRemoved: ing => dispatch(burgerBuilderActions.removeIngredient(ing)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));