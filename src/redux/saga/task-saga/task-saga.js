import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

// axios.defaults.timeout = 12000;

export function* tasksRequests() {
	yield takeLatest(
		types.CREATE_CHAMPIONSHIP_TASK_REQUEST,
		createChampionshipTask,
	);
	yield takeLatest(types.CREATE_ACTION_ITEM_REQUEST, createActionItem);
	yield takeLatest(types.CREATE_NOTE_TO_COACH_REQUEST, createNoteToCoach);
	yield takeLatest(types.GET_NOTES_REQUEST, getNotes);
	yield takeLatest(types.NOTES_BY_COACH_REQUEST, getCoachNotes);
}

function* createChampionshipTask(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.CREATE_CHAMPIONSHIP,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.CREATE_CHAMPIONSHIP_TASK_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.CREATE_CHAMPIONSHIP_TASK_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.CREATE_CHAMPIONSHIP_TASK_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* createActionItem(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.CREATE_ACTION_ITEM,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.CREATE_ACTION_ITEM_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.CREATE_ACTION_ITEM_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.CREATE_ACTION_ITEM_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* createNoteToCoach(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.CREATE_COACH_NOTE,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.CREATE_NOTE_TO_COACH_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.CREATE_NOTE_TO_COACH_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.CREATE_NOTE_TO_COACH_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getNotes(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.ALL_NOTES, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {notes} = response?.data?.data;
			cbSuccess(notes);

			yield put({
				type: types.GET_NOTES_SUCCESS,
				payload: notes.reverse(),
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_NOTES_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_NOTES_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getCoachNotes(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.COACH_NOTES, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {notes} = response?.data?.data;
			cbSuccess(notes);

			yield put({
				type: types.NOTES_BY_COACH_SUCCESS,
				payload: notes.reverse(),
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.NOTES_BY_COACH_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.NOTES_BY_COACH_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
