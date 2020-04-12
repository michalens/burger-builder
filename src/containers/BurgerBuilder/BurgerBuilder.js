import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'


const BurgerBuilder = props => {

	const [ purchasing, setPurchasing ] = useState(false)

	useEffect(() => {
		props.onInitIngredients()
	}, [])

	const updatePurchaseState = () => {
		const sum = Object.keys(props.ings)
					.map(igKey => props.ings[igKey])
					.reduce((acc, num) => acc+num)
		return sum > 0;

	}

	
	const purchaseHandler = () => {
		if(props.isAuth) {
			setPurchasing(true)
		} else {
			props.onSetAuthRedirectPath('/checkout')
			props.history.push('/auth')
		}
		
	}

	const purchaseCancelHandler = () => {
		setPurchasing(false)
	}

	const purchaseContinueHandler = () => {
		props.onInitPurchase()
		props.history.push('/checkout')
	}


	const disabledInfo = {...props.ings};
	for (let key in disabledInfo){
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let orderSummary = null;

	let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
	if (props.ings){
		burger = (<>
					<Burger ingredients={props.ings}/>
					<BuildControls 
						add={props.onIngredientAdded}
						remove={props.onIngredientRemoved}
						disabled={disabledInfo}
						price={props.price}
						purchasable={updatePurchaseState()}
						ordered={purchaseHandler}
						isAuth={props.isAuth}
					/>
				</>);
		orderSummary = <OrderSummary 
					ingredients={props.ings} 
					purchaseCanceled={purchaseCancelHandler}
					purchaseContinued={purchaseContinueHandler}
					price={props.price}
				/>
	}
	return (
		<> 
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</>
	);
}


const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ing => dispatch(actions.addIngredient(ing)),
		onIngredientRemoved: ing => dispatch(actions.removeIngredient(ing)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));