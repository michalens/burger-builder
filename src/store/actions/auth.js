import axios from 'axios'
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	}
}

export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: err
	}
}

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime*1000)
	}
}


export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAJG0MhQ-T7_IMUUnGLcFm6SqbS2Lj_0OY'
		if (!isSignUp) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAJG0MhQ-T7_IMUUnGLcFm6SqbS2Lj_0OY'
		}
		axios.post(url, authData)
			.then(resp => {
			console.log(resp.data)
				dispatch(authSuccess(resp.data))
				dispatch(checkAuthTimeout(resp.data.expiresIn))
			})
			.catch(err => {
				console.log(err.response.data.error.message)
				dispatch(authFail(err.response.data.error))
			})
	}
}