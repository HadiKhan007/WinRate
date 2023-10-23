import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

export function* authRequests() {
	yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
	yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword);
	yield takeLatest(types.OTP_VERIFY_REQUEST, otpRequest);
	yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPasswordRequest);
	yield takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword);
	yield takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile);
	yield takeLatest(types.SIGNUP_USER_REQUEST, signUpUser);
	yield takeLatest(types.GET_PROFILE_REQUEST, getUser);
	yield takeLatest(types.UPLOAD_IMAGE_REQUEST, imageUpload);
	yield takeLatest(types.GET_USER_POINTS_REQUEST, getUserPoints);
	yield takeLatest(types.UPDATE_FCM_TOKEN_REQUEST, updateFcmToken);
	yield takeLatest(types.DESTROY_FCM_TOKEN_REQUEST, destroyFcmToken);
	yield takeLatest(types.DELETE_USER_REQUEST, deleteUser);
	yield takeLatest(types.USER_SUPPORT_REQUEST, userSupport);
	yield takeLatest(types.VERIFY_KEY_REQUEST, verifyInviteKey);
	yield takeLatest(types.GET_EMAIL_REQUEST, getUserEmail);
}

function* login(apiParams) {
	const {params, cbSuccess, cbFailure} = apiParams;

	try {
		const response = yield axios.post(BASE_URL + ENDPOINTS.LOGIN, params, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.LOGIN_REQUEST_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.LOGIN_REQUEST_FAILURE,
				payload: response?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.LOGIN_REQUEST_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* signUpUser(params) {
	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.SIGNUP,
			params?.params,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
		);

		if (response?.data) {
			yield put({
				type: types.SIGNUP_USER_SUCCESS,
				payload: response?.data,
			});

			params.cbSuccess(response.data);
		} else {
			yield put({
				type: types.SIGNUP_USER_FAILURE,
				payload: response?.data,
			});

			params.cbFailure(response?.data.message);
		}
	} catch (error) {
		params.cbFailure(error?.response?.data?.message);
		yield put({
			type: types.SIGNUP_USER_FAILURE,
			payload: error?.response?.message,
		});
	}
}

function* forgotPassword(apiParams) {
	const {params, cbSuccess, cbFailure} = apiParams;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.FORGOTPASSWORD,
			params,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
		);

		if (response?.data) {
			cbSuccess(response);

			yield put({
				type: types.FORGOT_PASSWORD_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.FORGOT_PASSWORD_FAILURE,
				payload: response?.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.FORGOT_PASSWORD_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* otpRequest(apiParams) {
	const {params, cbSuccess, cbFailure} = apiParams;

	try {
		const response = yield axios.post(BASE_URL + ENDPOINTS.VERIFYOTP, params, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (response?.data) {
			cbSuccess(response);
			yield put({
				type: types.OTP_VERIFY_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.OTP_VERIFY_FAILURE,
				payload: response?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.OTP_VERIFY_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* resetPasswordRequest(apiParams) {
	const {params, cbSuccess, cbFailure} = apiParams;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.RESETPASSWORD,
			params,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
		);

		if (response?.data) {
			cbSuccess(response);
			yield put({
				type: types.RESET_PASSWORD_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.RESET_PASSWORD_FAILURE,
				payload: response?.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.RESET_PASSWORD_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* updatePassword(apiParams) {
	const {token, params, cbSuccess, cbFailure} = apiParams;
	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.UPDATEPASSWORD,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data);
			yield put({
				type: types.UPDATE_PASSWORD_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.UPDATE_PASSWORD_FAILURE,
				payload: response?.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.UPDATE_PASSWORD_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* updateProfile(params) {
	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.UPDATEPROFILE,
			params?.params,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${params?.token?.accessToken}`,
				},
			},
		);

		if (response?.data) {
			params?.cbSuccess(response.data);
			yield put({
				type: types.UPDATE_PROFILE_SUCCESS,
				payload: response?.data?.data?.user,
			});
		} else {
			params?.cbFailure(response);
			yield put({
				type: types.UPDATE_PROFILE_FAILURE,
				payload: response?.data,
			});
		}
	} catch (error) {
		params?.cbFailure(error.response?.data?.message);
		yield put({
			type: types.UPDATE_PROFILE_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* getUser(params) {
	try {
		const response = yield axios.get(
			BASE_URL + ENDPOINTS.PROFILE + `/${params?.params}`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${params?.token}`,
				},
			},
		);

		if (response?.data) {
			params?.cbSuccess(response.data);
			yield put({
				type: types.GET_PROFILE_SUCCESS,
				payload: response?.data?.data?.user,
			});
		} else {
			params?.cbFailure(response);
			yield put({
				type: types.GET_PROFILE_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		params?.cbFailure(error.response?.data?.message);
		yield put({
			type: types.GET_PROFILE_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* getUserPoints(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response.data);
			yield put({
				type: types.GET_USER_POINTS_SUCCESS,
				payload: response?.data?.data?.user,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.GET_USER_POINTS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.GET_USER_POINTS_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* imageUpload(params) {
	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.UPLOAD_IMG,
			params?.params,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		if (response?.data) {
			params?.cbSuccess(response.data);
			yield put({
				type: types.UPLOAD_IMAGE_SUCCESS,
				payload: response.data,
			});
		} else {
			params?.cbFailure(response);
			yield put({
				type: types.UPLOAD_IMAGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		params?.cbFailure(error.response?.data?.message);
		yield put({
			type: types.UPLOAD_IMAGE_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* updateFcmToken(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;
	try {
		const response = yield axios.post(BASE_URL + ENDPOINTS.UPDATE_FCM, params, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response.data);
			yield put({
				type: types.UPDATE_FCM_TOKEN_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.UPDATE_FCM_TOKEN_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.UPDATE_FCM_TOKEN_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* destroyFcmToken(Params) {
	const {token, cbSuccess, cbFailure} = Params;
	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.DESTROY_FCM, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response.data);
			yield put({
				type: types.DESTROY_FCM_TOKEN_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.DESTROY_FCM_TOKEN_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.DESTROY_FCM_TOKEN_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* deleteUser(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;
	try {
		const response = yield axios.delete(
			BASE_URL + ENDPOINTS.DELETE_USER(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response.data);
			yield put({
				type: types.DELETE_USER_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.DELETE_USER_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.DELETE_USER_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* userSupport(Param) {
	const {params, token, cbSuccess, cbFailure} = Param;
	try {
		const response = yield axios.post(BASE_URL + ENDPOINTS.SUPPORT, params, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response.data);
			yield put({
				type: types.USER_SUPPORT_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.USER_SUPPORT_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
		yield put({
			type: types.USER_SUPPORT_FAILURE,
			payload: error.response?.data?.message,
		});
	}
}

function* verifyInviteKey(Param) {
	const {params, cbSuccess, cbFailure} = Param;
	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.VERIFY_KEY(params));

		if (response?.data) {
			cbSuccess(response.data);
		} else {
			cbFailure(response);
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);
	}
}

function* getUserEmail(Param) {
	const {params, cbSuccess, cbFailure} = Param;
	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.GET_EMAIL(params));

		if (response?.data) {
			const {email} = response?.data?.data;

			cbSuccess(email);

			yield put({
				type: types.GET_EMAIL_SUCCESS,
				payload: email,
			});
		} else {
			cbFailure(response);
			yield put({
				type: types.GET_EMAIL_FAILURE,
				payload: null,
			});
		}
	} catch (error) {
		cbFailure(error.response?.data?.message);

		yield put({
			type: types.GET_EMAIL_FAILURE,
			payload: null,
		});
	}
}
