import * as TYPES from '../../types';

export const getLogInAction = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.LOGIN_REQUEST_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const getForgotAction = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.FORGOT_PASSWORD_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const getOTPAction = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.OTP_VERIFY_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const resendOTPRequest = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.RESEND_OTP_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const resetPasswordAction = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.RESET_PASSWORD_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const updatePasswordAction = (token, params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.UPDATE_PASSWORD_REQUEST,
		token,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const signUpRequest = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.SIGNUP_USER_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const updateProfileAction = (token, params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.UPDATE_PROFILE_REQUEST,
		token,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const uploadImageRequest = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.UPLOAD_IMAGE_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const getProfileRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_PROFILE_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getPointsRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_USER_POINTS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const updateFcmTokenRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.UPDATE_FCM_TOKEN_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const destroyFcmTokenRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.DESTROY_FCM_TOKEN_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const deleteUserRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.DELETE_USER_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const userSupportRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.USER_SUPPORT_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const verifyInviteKey = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.VERIFY_KEY_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const getEamilRequest = (params, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_EMAIL_REQUEST,
		params,
		cbSuccess,
		cbFailure,
	};
};
