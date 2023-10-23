import * as TYPES from '../../types';

export const getLeaderBoardUserRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_LEADERBOARD_USERS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getLeaderBoardUserDetailsRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.GET_LEADERBOARD_USER_DETAILS_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const challengeUserRequest = (params, token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.CHALLENGE_USER_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};
