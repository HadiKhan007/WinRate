import {SWOT_List} from '../../../utilities';
import * as TYPES from '../../types/swot-analysis-types/swot-analysis-types';

const initialState = {
	questions: SWOT_List,
	swot_answers: [],
};

const swotAnalysisReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_SWOT_ANALYSIS_SUCCESS:
		return {
			...state,
			swot_answers: payload,
			questions: SWOT_List,
		};
	case TYPES.GET_SWOT_ANALYSIS_FAILURE:
		return {
			...state,
			swot_answers: [],
		};
	case TYPES.SAVE_SWOT_QUESTION_ANSWER:
		return {
			...state,
			questions: state.questions.map(item =>
				item?.id === payload.id
					? {...item, answer: payload.answer}
					: {...item},
			),
		};
	case TYPES.CREATE_SWOT_ANALYSIS_SUCCESS: 
		return {
			...state,
			swot_answers: [],
			questions: SWOT_List,
		};
	default:
		return state;
	}
};
export default swotAnalysisReducer;
