import * as TYPES from '../../types';

const initialState = {
	isActive: true,
	challenges: [],
	inactiveChallenges: [],
	actionItems: [],
	championshipTask: [],
	allCompleted: false,
	dayWon: false,
	showLegacy: {
		date: new Date(),
		displayed: false,
	},
	streaks: [],
};

const challengeReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.CHANGE_CHALLENGE_STATUS:
		return {
			...state,
			isActive: !state.isActive,
		};

	case TYPES.GET_ACTION_ITEM_SUCCESS:
		return {
			...state,
			actionItems: payload,
		};
	case TYPES.GET_ACTION_ITEM_FAILURE:
		return {
			...state,
			actionItems: [],
		};

	case TYPES.GET_CHAMPIONSHIP_TASK_SUCCESS:
		return {
			...state,
			championshipTask: payload.length > 0 ? payload : [],
		};
	case TYPES.GET_CHAMPIONSHIP_TASK_FAILURE:
		return {
			...state,
			championshipTask: [],
		};

	case TYPES.WON_DAY:
		return {
			...state,
			dayWon: true,
		};
	case TYPES.ALL_TASKS_COMPLETED:
		return {
			...state,
			allCompleted: payload,
			dayWon: payload ? state.dayWon : false,
		};

	case TYPES.GET_ACTIVE_CHALLENGE_SUCCESS:
		return {
			...state,
			challenges: payload,
		};
	case TYPES.GET_ACTIVE_CHALLENGE_FAILURE:
		return {
			...state,
			challenges: [],
		};
	case TYPES.GET_INACTIVE_CHALLENGE_SUCCESS:
		return {
			...state,
			inactiveChallenges: payload,
		};
	case TYPES.GET_INACTIVE_CHALLENGE_FAILURE:
		return {
			...state,
			inactiveChallenges: [],
		};

	case TYPES.SHOW_LEGACY_STATEMENT:
		return {
			...state,
			showLegacy: payload,
		};

	case TYPES.GET_STREAKS_RECORD_SUCCESS:
		return {
			...state,
			streaks: payload,
		};
	case TYPES.GET_STREAKS_RECORD_FAILURE:
		return {
			...state,
			streaks: [],
		};

	case TYPES.LOGOUT_REQUEST_SUCCESS:
		return {
			...state,
			isActive: true,
			challenges: [],
			inactiveChallenges: [],
			actionItems: [],
			championshipTask: [],
			allCompleted: false,
			dayWon: false,
			streaks: [],
		};

	default:
		return state;
	}
};

export default challengeReducer;
