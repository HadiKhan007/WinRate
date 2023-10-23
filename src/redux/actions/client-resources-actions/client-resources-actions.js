import * as TYPES from '../../types';

export const getCoursesRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_ALL_COURSES_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getHuddlesRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_HUDDLES_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getCallRecordingsRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_CALL_RECORDINGS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getEventsRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_ALL_EVENTS_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getEventDetailsRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.EVENT_DETAILS_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const registerEventRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.REGISTER_EVENT_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const searchCoursesRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.SEARCH_COURSES_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};
