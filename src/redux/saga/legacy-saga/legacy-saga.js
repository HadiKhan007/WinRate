import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as TYPES from '../../types';

axios.defaults.timeout = 10000;

export function* legacyRequests() {
	yield takeLatest(TYPES.GET_DAILY_MOTIVATION_REQUEST, getDailyMotivations);
	yield takeLatest(
		TYPES.CREATE_DAILY_MOTIVATION_REQUEST,
		createDailyMotivations,
	);
	yield takeLatest(TYPES.UPDATE_LEGACY_REQUEST, updateDailyMotivations);
	yield takeLatest(TYPES.DELETE_LEGACY_REQUEST, deleteDailyMotivations);
}

function* getDailyMotivations(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.GET_ALL_LEGACY, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {Legacy} = response?.data?.data;
			cbSuccess(Legacy);

			const data = Legacy.map(item => ({
				...item,
				selected: false,
			}));

			yield put({
				type: TYPES.GET_DAILY_MOTIVATION_SUCCESS,
				payload: data.reverse(),
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.GET_DAILY_MOTIVATION_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.GET_DAILY_MOTIVATION_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* createDailyMotivations(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.CREATE_LEGACY,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: TYPES.CREATE_DAILY_MOTIVATION_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.CREATE_DAILY_MOTIVATION_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.CREATE_DAILY_MOTIVATION_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* updateDailyMotivations(Params) {
	const {params, id, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.UPADTE_DELETE_LEGACY(id),
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: TYPES.UPDATE_LEGACY_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.UPDATE_LEGACY_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.UPDATE_LEGACY_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* deleteDailyMotivations(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.delete(
			BASE_URL + ENDPOINTS.UPADTE_DELETE_LEGACY(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data);

			yield put({
				type: TYPES.DELETE_LEGACY_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.DELETE_LEGACY_FAILURE,
				payload: null,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message || error);
		yield put({
			type: TYPES.DELETE_LEGACY_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
