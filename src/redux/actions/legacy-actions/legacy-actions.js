import * as TYPES from './../../types/legacy-types/legacy-types';

export const getDailyMotivationRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_DAILY_MOTIVATION_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const createDailyMotivations = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.CREATE_DAILY_MOTIVATION_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const updateDailyMotivations = (
	params,
	id,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.UPDATE_LEGACY_REQUEST,
		params,
		id,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const deleteDailyMotivationsRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.DELETE_LEGACY_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};
