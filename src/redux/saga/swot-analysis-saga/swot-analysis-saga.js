import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* swotAnalysisRequests() {
	yield takeLatest(types.GET_SWOT_ANALYSIS_REQUEST, getSwotAnalysis);
	yield takeLatest(types.CREATE_SWOT_ANALYSIS_REQUEST, createSwotAnalysisForm);
}

function* getSwotAnalysis(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.SWOT, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			const { swotAnalysis } = res?.data?.data;
			cbSuccess(swotAnalysis);

			yield put({
				type: types.GET_SWOT_ANALYSIS_SUCCESS,
				payload: swotAnalysis,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_SWOT_ANALYSIS_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_SWOT_ANALYSIS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* createSwotAnalysisForm(param) {
	const {token, params, cbSuccess, cbFailure} = param;
	try {
		const res = yield axios.post(BASE_URL + ENDPOINTS.CREATE_SWOT, params, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			cbSuccess(res?.data);
     

			yield put({
				type: types.CREATE_SWOT_ANALYSIS_SUCCESS,
				payload: res?.data,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.CREATE_SWOT_ANALYSIS_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.CREATE_SWOT_ANALYSIS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
