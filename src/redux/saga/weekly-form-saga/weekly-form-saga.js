import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* weeklyFormRequests() {
	yield takeLatest(types.GET_CLIENT_WEEKLY_QUES_REQUEST, getWeeklyQuestion);
	yield takeLatest(types.CREATE_CLIENT_WEEKLY_FORM_REQUEST, createWeeklyForm);
	yield takeLatest(types.GET_WEEKLY_FORM_REQUEST, getWeeklyForm);
}

function* getWeeklyQuestion(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.WEEKLY_QUESTIONS, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			const {isCompleted, checkInFormAnswers, checkInFormQuestions} =
				res?.data?.data;
			cbSuccess(res?.data?.data);

			let data = [];

			if (isCompleted) {
				data = checkInFormAnswers;
			} else {
				if (checkInFormQuestions?.length > 0) {
					data = checkInFormQuestions?.map(item => ({
						...item,
						answer: '',
					}));
				}
			}

			yield put({
				type: types.GET_CLIENT_WEEKLY_QUES_SUCCESS,
				payload: data,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_CLIENT_WEEKLY_QUES_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_CLIENT_WEEKLY_QUES_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* createWeeklyForm(param) {
	const {params, token, cbSuccess, cbFailure} = param;
	try {
		const res = yield axios.post(
			BASE_URL + ENDPOINTS.CREATE_WEEKLY_ANSWERS,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (res?.data) {
			cbSuccess(res?.data);

			yield put({
				type: types.CREATE_CLIENT_WEEKLY_FORM_SUCCESS,
				payload: res?.data,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.CREATE_CLIENT_WEEKLY_FORM_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.CREATE_CLIENT_WEEKLY_FORM_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getWeeklyForm(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.WEEKLY_ANSWERS, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			cbSuccess(res?.data);

			yield put({
				type: types.GET_WEEKLY_FORM_SUCCESS,
				payload: res?.data,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_WEEKLY_FORM_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_WEEKLY_FORM_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
