import * as TYPES from '../../types';

const initialState = {
	events: [],
	selectedEvent: null,
	huddle: [],
	selectedVideo: null,
	courses: [],
	selectedCourse: null,
	recordings: [],
};

const clientResourcesReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	//COURSES
	case TYPES.GET_ALL_COURSES_SUCCESS:
		return {
			...state,
			courses: payload,
			selectedCourse: null,
		};
	case TYPES.GET_ALL_COURSES_FAILURE:
		return {
			...state,
			courses: [],
			selectedCourse: null,
		};
	case TYPES.SELECTED_COURSE:
		return {
			...state,
			selectedCourse: payload,
		};
	case TYPES.SEARCH_COURSES_SUCCESS:
		return {
			...state,
			courses: payload,
		};
	case TYPES.SEARCH_COURSES_FAILURE:
		return {
			...state,
			courses: [],
		};

		//HUDDLES
	case TYPES.GET_HUDDLES_SUCCESS:
		return {
			...state,
			huddle: payload,
			selectedVideo: null,
		};
	case TYPES.GET_HUDDLES_FAILURE:
		return {
			...state,
			huddle: [],
			selectedVideo: null,
		};
	case TYPES.SELECTED_HUDDLE:
		return {
			...state,
			selectedVideo: payload,
		};

		//CALL RECORDINGS
	case TYPES.GET_CALL_RECORDINGS_SUCCESS:
		return {
			...state,
			recordings: payload,
			selectedVideo: null,
		};
	case TYPES.GET_CALL_RECORDINGS_FAILURE:
		return {
			...state,
			recordings: [],
			selectedVideo: null,
		};
	case TYPES.SELECTED_CALL_RECORDING:
		return {
			...state,
			selectedVideo: payload,
		};

		//EVENTS
	case TYPES.GET_ALL_EVENTS_SUCCESS:
		return {
			...state,
			events: payload,
			selectedEvent: null,
		};
	case TYPES.GET_ALL_EVENTS_FAILURE:
		return {
			...state,
			events: [],
			selectedEvent: null,
		};
	case TYPES.SELECTED_EVENTS:
		return {
			...state,
			selectedEvent: payload,
		};
	case TYPES.EVENT_DETAILS_SUCCESS:
		return {
			...state,
			selectedEvent: payload,
		};
	default:
		return state;
	}
};
export default clientResourcesReducer;
