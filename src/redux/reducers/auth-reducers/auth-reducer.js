import * as TYPES from '../../types/auth-types/auth-types';

const initialState = {
	loading: false,
	isSuccess: false,
	isFailure: false,
	forgotPassRes: null,
	resetPassRes: null,
	otp_verify: null,
	resendData: null,
	userInfo: null,
	updatePassword: null,
	user: null,
	signUpObject: null,
	isLogged: false,
	token: null,
	points: 0,
	email: null,
};

const authReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.LOGIN_REQUEST_SUCCESS:
		return {
			...state,
			loading: false,
			isSuccess: true,
			isFailure: false,
			userInfo: payload?.data,
			user: payload?.data?.user,
			isLogged: true,
			token: payload?.data?.token?.accessToken,
		};
	case TYPES.LOGIN_REQUEST_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			userInfo: null,
			user: null,
			isLogged: false,
			token: null,
		};
	case TYPES.FORGOT_PASSWORD_SUCCESS:
		return {
			...state,
			loading: true,
			isSuccess: true,
			isFailure: false,
			forgotPassRes: payload,
		};
	case TYPES.FORGOT_PASSWORD_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			forgotPassRes: null,
		};
	case TYPES.OTP_VERIFY_SUCCESS:
		return {
			...state,
			loading: false,
			isSuccess: true,
			isFailure: false,
			otp_verify: payload,
		};
	case TYPES.OTP_VERIFY_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			otp_verify: null,
		};
	case TYPES.RESEND_OTP_SUCCESS:
		return {
			...state,
			loading: true,
			isSuccess: true,
			isFailure: false,
			resendData: payload,
		};
	case TYPES.RESEND_OTP_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			resendData: null,
		};
	case TYPES.RESET_PASSWORD_SUCCESS:
		return {
			...state,
			loading: true,
			isSuccess: true,
			isFailure: false,
			resetPassRes: payload,
		};
	case TYPES.RESET_PASSWORD_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			resetPassRes: null,
		};
	case TYPES.UPDATE_PASSWORD_SUCCESS:
		return {
			...state,
			loading: true,
			isSuccess: true,
			isFailure: false,
			updatePassword: payload,
		};
	case TYPES.UPDATE_PASSWORD_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			updatePassword: null,
		};
	case TYPES.UPDATE_PROFILE_SUCCESS:
		return {
			...state,
			loading: true,
			isSuccess: true,
			isFailure: false,
			user: payload,
		};
	case TYPES.UPDATE_PROFILE_FAILURE:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			user: null,
		};
	case TYPES.LOGOUT_REQUEST_SUCCESS:
		return {
			...state,
			loading: false,
			isSuccess: false,
			isFailure: true,
			isLogged: false,
			token: null,
			points: 0,
			email: null,
		};
	case TYPES.GET_PROFILE_SUCCESS:
		return {
			...state,
			user: payload,
		};
	case TYPES.SAVE_SIGNUP_OBJECT:
		return {
			...state,
			signUpObject: payload,
		};
	case TYPES.GET_USER_POINTS_SUCCESS:
		return {
			...state,
			points: payload,
		};
	case TYPES.GET_USER_POINTS_FAILURE:
		return {
			...state,
			points: 0,
		};
	case TYPES.INVITE_URL:
		return {
			...state,
			inviteUrl: payload,
		};

	case TYPES.GET_EMAIL_SUCCESS:
		return {
			...state,
			email: payload,
		};
	case TYPES.SIGNUP_USER_SUCCESS:
		return {
			...state,
			email: null,
		};
	case TYPES.GET_EMAIL_FAILURE:
		return {
			...state,
			email: null,
		};
	default:
		return state;
	}
};
export default authReducer;
