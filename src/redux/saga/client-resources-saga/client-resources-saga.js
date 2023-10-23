import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as TYPES from '../../types';

axios.defaults.timeout = 10000;

export function* clientResourcesRequests() {
	yield takeLatest(TYPES.GET_ALL_COURSES_REQUEST, getCourses);
	yield takeLatest(TYPES.GET_HUDDLES_REQUEST, getHuddles);
	yield takeLatest(TYPES.GET_CALL_RECORDINGS_REQUEST, getCallRecordings);
	yield takeLatest(TYPES.GET_ALL_EVENTS_REQUEST, getEvents);
	yield takeLatest(TYPES.EVENT_DETAILS_REQUEST, getEventDetails);
	yield takeLatest(TYPES.REGISTER_EVENT_REQUEST, registerInEvent);
	yield takeLatest(TYPES.SEARCH_COURSES_REQUEST, searchCourses);
}

function* getCourses(Params) {
	const {cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.COURSES, {
			headers: getHeaders(),
		});

		if (response?.data) {
			const {courses} = response?.data?.data;
			cbSuccess(courses);

			yield put({
				type: TYPES.GET_ALL_COURSES_SUCCESS,
				payload: courses,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.GET_ALL_COURSES_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.GET_ALL_COURSES_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getHuddles(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.HUDDLE, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {result} = response?.data?.data;
			cbSuccess(result);

			yield put({
				type: TYPES.GET_HUDDLES_SUCCESS,
				payload: result,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.GET_HUDDLES_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.GET_HUDDLES_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getCallRecordings(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.CALL_RECORDINGS, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {result} = response?.data?.data;
			cbSuccess(result);

			yield put({
				type: TYPES.GET_CALL_RECORDINGS_SUCCESS,
				payload: result,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.GET_CALL_RECORDINGS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.GET_CALL_RECORDINGS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getEvents(Params) {
	const {params, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.EVENTS(params), {
			headers: getHeaders(),
		});

		if (response?.data) {
			const {events} = response?.data?.data;
			cbSuccess(events);

			const resp = events.map(item => ({
				...item,
				RSVP: item.members.some(obj => obj.email === params),
			}));
			const data = resp.filter(item => item.status !== 'cancel');

			yield put({
				type: TYPES.GET_ALL_EVENTS_SUCCESS,
				payload: data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.GET_ALL_EVENTS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.GET_ALL_EVENTS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getEventDetails(Params) {
	const {params, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(
			BASE_URL + ENDPOINTS.EVENT_DETAILS(params),
			{
				headers: getHeaders(),
			},
		);

		if (response?.data) {
			const {event} = response?.data?.data;
			cbSuccess(event);

			yield put({
				type: TYPES.EVENT_DETAILS_SUCCESS,
				payload: event,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.EVENT_DETAILS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.EVENT_DETAILS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* registerInEvent(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.REGISTER_EVENT,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: TYPES.REGISTER_EVENT_SUCCESS,
				payload: response?.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.REGISTER_EVENT_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.REGISTER_EVENT_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* searchCourses(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(
			BASE_URL + ENDPOINTS.SEARCH_COURSES(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			const {courses} = response?.data?.data;
			cbSuccess(courses);

			yield put({
				type: TYPES.SEARCH_COURSES_SUCCESS,
				payload: courses,
			});
		} else {
			cbFailure(response);

			yield put({
				type: TYPES.SEARCH_COURSES_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: TYPES.SEARCH_COURSES_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
