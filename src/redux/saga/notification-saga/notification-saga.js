import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as TYPES from '../../types';

axios.defaults.timeout = 10000;

export function* notificationsRequests() {
	yield takeLatest(TYPES.GET_NOTIFICATION_REQUEST, getNotifications);
	yield takeLatest(TYPES.MARK_NOTIFICATION_REQUEST, markNotifications);
	yield takeLatest(TYPES.DELETE_NOTIFICATION_REQUEST, deleteNotifications);
	yield takeLatest(TYPES.MARK_ALL_NOTIFICATION_REQUEST, markAllNotifications);
}

function* getNotifications(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(
			BASE_URL + ENDPOINTS.NOTIFICATIONS(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			const {Notifications} = response?.data?.data;
			cbSuccess(Notifications);

			yield put({
				type: TYPES.GET_NOTIFICATION_SUCCESS,
				payload: Notifications,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.GET_NOTIFICATION_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.GET_NOTIFICATION_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* markNotifications(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(BASE_URL + ENDPOINTS.NOTIFY, params, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: TYPES.MARK_NOTIFICATION_SUCCESS,
				payload: response?.data?.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.MARK_NOTIFICATION_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.MARK_NOTIFICATION_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* markAllNotifications(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.MARK_ALL_NOTIFY,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: TYPES.MARK_ALL_NOTIFICATION_SUCCESS,
				payload: response?.data?.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.MARK_ALL_NOTIFICATION_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.MARK_ALL_NOTIFICATION_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* deleteNotifications(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.delete(
			BASE_URL + ENDPOINTS.DELETE_NOTIFY(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: TYPES.DELETE_NOTIFICATION_SUCCESS,
				payload: response?.data?.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.DELETE_NOTIFICATION_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.DELETE_NOTIFICATION_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
