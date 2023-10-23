import * as types from '../../types/notification-types/notification-types';

export const getNotifications = (params, token, cbSuccess, cbFailure) => {
	return {
		type: types.GET_NOTIFICATION_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const markNotifications = (params, token, cbSuccess, cbFailure) => {
	return {
		type: types.MARK_NOTIFICATION_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const markAllNotifications = (params, token, cbSuccess, cbFailure) => {
	return {
		type: types.MARK_ALL_NOTIFICATION_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const deleteNotifications = (params, token, cbSuccess, cbFailure) => {
	return {
		type: types.DELETE_NOTIFICATION_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};
