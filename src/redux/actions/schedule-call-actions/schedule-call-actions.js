import * as types from '../../types/schedule-call-types/schedule-call-types';

export const getScheduledCallsRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: types.GET_SCHEDULED_CALLS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getScheduledHuddleCallsRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: types.SCHEDULED_HUDDLE_CALLS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const joinScheduledCallRequest = (
	params,
	callType,
	userToken,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: types.JOIN_CALL_REQUEST,
		params,
		callType,
		userToken,
		cbSuccess,
		cbFailure,
	};
};
