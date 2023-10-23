import * as TYPES from '../../types';

const initialState = {
	weeklyQues: [],
};

const weeklyFormsReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_CLIENT_WEEKLY_QUES_SUCCESS:
		return {
			...state,
			weeklyQues: payload,
		};
	case TYPES.GET_CLIENT_WEEKLY_QUES_FAILURE:
		return {
			...state,
			weeklyQues: [],
		};
	case TYPES.SAVE_WEEKLY_QUESTION_ANSWER:
		return {
			...state,
			weeklyQues: state.weeklyQues.map(item =>
				item?.id === payload.id
					? {...item, answer: payload.answer}
					: {...item},
			),
		};
	case TYPES.CLEAR_WEEKLY_FORM:
		return {
			...state,
			weeklyQues: [],
		};
	case TYPES.LOGOUT_REQUEST_SUCCESS:
		return {
			...state,
			weeklyQues: [],
		};
	default:
		return state;
	}
};
export default weeklyFormsReducer;
