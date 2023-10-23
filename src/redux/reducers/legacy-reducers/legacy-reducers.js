import * as TYPES from '../../types';

const initialState = {
	dailyMotivation: [],
	newMotivation: null,
	selectedMotivation: null,
};

const legacyReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_DAILY_MOTIVATION_SUCCESS:
		return {
			...state,
			dailyMotivation: payload,
			selectedMotivation: null,
		};
	case TYPES.GET_DAILY_MOTIVATION_FAILURE:
		return {
			...state,
			dailyMotivation: [],
			selectedMotivation: null,
		};
	case TYPES.CREATE_DAILY_MOTIVATION_SUCCESS:
		return {
			...state,
			newMotivation: payload,
		};
	case TYPES.CREATE_DAILY_MOTIVATION_FAILURE:
		return {
			...state,
			newMotivation: null,
		};
	case TYPES.SELECTED_LEGACY_STATEMENT:
		return {
			...state,
			selectedMotivation: payload,
		};
	case TYPES.UPDATE_LEGACY_SUCCESS:
		return {
			...state,
			selectedMotivation: null,
		};
	case TYPES.VIEW_SELECTED_LEGACY_STATEMENT:
		return {
			...state,
			dailyMotivation: state.dailyMotivation.map(obj =>
				obj.id === payload.id
					? {...obj, selected: true}
					: {...obj, selected: false},
			),
			selectedMotivation: payload,
		};
	default:
		return state;
	}
};
export default legacyReducer;
