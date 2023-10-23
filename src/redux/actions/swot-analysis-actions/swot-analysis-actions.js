import * as TYPES from './../../types';

export const createSwotAnalysisFormRequest = (
	token,
	params,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.CREATE_SWOT_ANALYSIS_REQUEST,
		token,
		params,
		cbSuccess,
		cbFailure,
	};
};

export const getSwotAnalysisRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_SWOT_ANALYSIS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};
