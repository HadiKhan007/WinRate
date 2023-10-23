import * as TYPES from './../../types';

export const createOnboadingFormRequest = (
	token,
	params,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.CREATE_CLIENT_ONBOARDING_REQUEST,
		token,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const getOnboadingQuesRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_CLIENT_ONBOARDING_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

//ANSERS
export const getOnboadingFormRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_ONBOARDING_FORM_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};
