import * as TYPES from '../../types';

const initialState = {
	notificationList: [],
	notificationCount: 0,
};

const notificationReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_NOTIFICATION_SUCCESS:
		return {
			...state,
			notificationList: payload,
			notificationCount: payload.filter(item => item?.mark_as_read === false)?.length,
		};
	case TYPES.GET_NOTIFICATION_FAILURE:
		return {
			...state,
			notificationList: [],
			notificationCount: 0,
		};
	default:
		return state;
	}
};
export default notificationReducer;
