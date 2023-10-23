import * as TYPES from './../../types';

export const getWeeklyQuestionRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_CLIENT_WEEKLY_QUES_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const anwserWeeklyQuestionRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.CREATE_CLIENT_WEEKLY_FORM_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getWeeklyFormRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_WEEKLY_FORM_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};
