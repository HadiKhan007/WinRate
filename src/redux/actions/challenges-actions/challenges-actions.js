import * as TYPES from '../../types';

export const getChampionShipTasksRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_CHAMPIONSHIP_TASK_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const completeChampionShipTaskRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.COMPLETE_CHAMPIONSHIP_TASK_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getActionItemRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_ACTION_ITEM_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const completeActionItemRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.COMPLETE_ACTION_ITEM_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getActiveChallengesRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_ACTIVE_CHALLENGE_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getInActiveChallengesRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_INACTIVE_CHALLENGE_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const kickAssRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.KICK_ASS_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const acceptChallengeRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.ACCEPT_CHALLENGE_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const rejectChallengeRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.REJECT_CHALLENGE_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const streaksRecordRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_STREAKS_RECORD_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const deleteActionItemRequest = (params,token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.DELETE_ACTION_ITEMS_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const deleteChamionshipTaskRequest = (params,token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.DELETE_CHAMPIONSHIP_TASK_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};