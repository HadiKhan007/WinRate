import * as TYPES from '../../types';

const initialState = {
	notes: [],
	coachNotes: [],
};

const taskReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_NOTES_SUCCESS:
		return {
			...state,
			notes: payload,
		};
	case TYPES.GET_NOTES_FAILURE:
		return {
			...state,
			notes: [],
		};
	case TYPES.NOTES_BY_COACH_SUCCESS:
		return {
			...state,
			coachNotes: payload,
		};
	case TYPES.NOTES_BY_COACH_FAILURE:
		return {
			...state,
			coachNotes: [],
		};
	default:
		return state;
	}
};
export default taskReducer;
