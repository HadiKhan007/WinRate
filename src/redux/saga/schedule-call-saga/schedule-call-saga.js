import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* scheduledCallsRequests() {
	yield takeLatest(types.GET_SCHEDULED_CALLS_REQUEST, getScheduledCalls);
	yield takeLatest(
		types.SCHEDULED_HUDDLE_CALLS_REQUEST,
		getScheduledHuddleCalls,
	);
	yield takeLatest(types.JOIN_CALL_REQUEST, joinCalls);
}

function* getScheduledCalls(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.SCHEDULED_CALLS, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			const {calls} = res?.data?.data;
			cbSuccess(res?.data?.data);

			yield put({
				type: types.GET_SCHEDULED_CALLS_SUCCESS,
				payload: calls,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_SCHEDULED_CALLS_FAILURE,
				payload: [],
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_SCHEDULED_CALLS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getScheduledHuddleCalls(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.SCHEDULED_HUDDLE_CALLS, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			const {calls} = res?.data?.data;
			cbSuccess(res?.data?.data);

			yield put({
				type: types.SCHEDULED_HUDDLE_CALLS_SUCCESS,
				payload: calls,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.SCHEDULED_HUDDLE_CALLS_FAILURE,
				payload: [],
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.SCHEDULED_HUDDLE_CALLS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* joinCalls(param) {
	const {params, callType, userToken, cbSuccess, cbFailure} = param;
	const URL =
    BASE_URL +
    (callType == 'clientCall' ? ENDPOINTS.JOIN_CALL : ENDPOINTS.HUDDLE_CALL);
	try {
		const res = yield axios.post(URL, params, {
			headers: getHeaders(userToken),
		});

		const {token} = res?.data?.data;

		if (token) {
			cbSuccess(res?.data?.data);

			yield put({
				type: types.JOIN_CALL_SUCCESS,
				payload: res?.data,
			});
		} else {
			if (res?.status === 200) {
				cbFailure('Call not initiated yet.');
			} else {
				cbFailure(res?.data);
			}

			yield put({
				type: types.JOIN_CALL_FAILURE,
				payload: [],
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.JOIN_CALL_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
