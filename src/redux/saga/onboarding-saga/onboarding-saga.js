import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* onboardingRequests() {
	yield takeLatest(types.GET_CLIENT_ONBOARDING_REQUEST, getOnboardingQuestion);
	yield takeLatest(types.GET_ONBOARDING_FORM_REQUEST, getOnboardingForm);
	yield takeLatest(
		types.CREATE_CLIENT_ONBOARDING_REQUEST,
		createOnboardingForm,
	);
}

function* getOnboardingQuestion(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.ONBORADING, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			const {onboardingFormQuestions} = res?.data?.data;
			cbSuccess(res?.data?.data);

			let data = [];
			if (onboardingFormQuestions?.length > 0) {
				data = onboardingFormQuestions?.map(item => ({
					...item,
					answer: '',
				}));
			}

			yield put({
				type: types.GET_CLIENT_ONBOARDING_SUCCESS,
				payload: data,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_CLIENT_ONBOARDING_FAILURE,
				payload: [],
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_CLIENT_ONBOARDING_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* createOnboardingForm(param) {
	const {token, params, cbSuccess, cbFailure} = param;
	try {
		const res = yield axios.post(
			BASE_URL + ENDPOINTS.ONBORADING + ENDPOINTS.CREATE_ONBOARDING,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (res?.data) {
			cbSuccess(res?.data);

			yield put({
				type: types.CREATE_CLIENT_ONBOARDING_SUCCESS,
				payload: res?.data,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.CREATE_CLIENT_ONBOARDING_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.CREATE_CLIENT_ONBOARDING_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getOnboardingForm(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(
			BASE_URL + ENDPOINTS.ONBORADING + ENDPOINTS.ONBOARDING_FORM,
			{
				headers: getHeaders(token),
			},
		);

		if (res?.data) {
			const {data} = res?.data;
			cbSuccess(data);

			let dataArray = [];
			if (data?.length > 0) {
				dataArray = data?.map(item => ({
					...item,
					expanded: false,
				}));
			}

			yield put({
				type: types.GET_ONBOARDING_FORM_SUCCESS,
				payload: dataArray,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_ONBOARDING_FORM_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_ONBOARDING_FORM_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
