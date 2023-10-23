import * as TYPES from '../../types';

const initialState = {
	leaderUsers: [],
	selectedUser: null,
};

const leaderboardReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_LEADERBOARD_USERS_SUCCESS:
		return {
			...state,
			leaderUsers: payload,
		};
	case TYPES.GET_LEADERBOARD_USERS_FAILURE:
		return {
			...state,
			leaderUsers: [],
		};
    
	case TYPES.GET_LEADERBOARD_USER_DETAILS_SUCCESS:
		return {
			...state,
			selectedUser: payload,
		};
	case TYPES.GET_LEADERBOARD_USER_DETAILS_FAILURE:
		return {
			...state,
			selectedUser: null,
		};
    
	default:
		return state;
	}
};
export default leaderboardReducer;
