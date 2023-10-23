import * as TYPES from '../../types/onboarding-types/onboarding-types';

const initialState = {
	questions: [],
	onBoardingForm: [],
};

const onboardingReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_CLIENT_ONBOARDING_SUCCESS:
		return {
			...state,
			questions: payload,
		};
	case TYPES.GET_CLIENT_ONBOARDING_FAILURE:
		return {
			...state,
			questions: [],
		};
	case TYPES.SAVE_ONBOARDING_QUESTION_ANSWER:
		return {
			...state,
			questions: state.questions.map(item =>
				item?.id === payload.id
					? {...item, answer: payload.answer}
					: {...item},
			),
		};
	case TYPES.GET_ONBOARDING_FORM_SUCCESS:
		return {
			...state,
			onBoardingForm: payload,
		};
	case TYPES.GET_ONBOARDING_FORM_FAILURE:
		return {
			...state,
			onBoardingForm: [],
		};

	case TYPES.CLEAR_ONBOARDING:
		return {
			...state,
			questions: [],
		};
	default:
		return state;
	}
};
export default onboardingReducer;
