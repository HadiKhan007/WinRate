import * as TYPES from '../../types';

const initialState = {
	scheduledCalls: [],
	huddleScheduledCalls: [],
};

const scheduleCallReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_SCHEDULED_CALLS_SUCCESS:
		return {
			...state,
			scheduledCalls: payload,
		};
	case TYPES.GET_SCHEDULED_CALLS_FAILURE:
		return {
			...state,
			scheduledCalls: [],
		};
	case TYPES.SCHEDULED_HUDDLE_CALLS_SUCCESS:
		return {
			...state,
			huddleScheduledCalls: payload,
		};
	case TYPES.SCHEDULED_HUDDLE_CALLS_FAILURE:
		return {
			...state,
			huddleScheduledCalls: [],
		};

	default:
		return state;
	}
};

export default scheduleCallReducer;
