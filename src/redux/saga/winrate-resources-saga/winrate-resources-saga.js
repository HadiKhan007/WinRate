import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* winRateResourcesRequests() {
	yield takeLatest(types.GET_APPAREL_REQUEST, getApparels);
	yield takeLatest(types.GET_PODCASTS_REQUEST, getPodcasts);
	yield takeLatest(types.GET_YOUTUBE_VIDEOS_REQUEST, getYoutubeVideos);
	yield takeLatest(types.YOUTUBE_PAGINATION_REQUEST, getYoutubePagination);
}

function* getApparels(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.APPAREL, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			const {result} = res?.data?.data;
			cbSuccess(result);

			yield put({
				type: types.GET_APPAREL_SUCCESS,
				payload: result,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_APPAREL_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_APPAREL_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getPodcasts(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.PODCASTS, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			cbSuccess(res?.data?.data);

			yield put({
				type: types.GET_PODCASTS_SUCCESS,
				payload: res?.data?.data?.podcasts,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_PODCASTS_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_PODCASTS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getYoutubeVideos(params) {
	const {token, cbSuccess, cbFailure} = params;
	try {
		const res = yield axios.get(BASE_URL + ENDPOINTS.YOUTUBE, {
			headers: getHeaders(token),
		});

		if (res?.data) {
			cbSuccess(res?.data?.data);

			yield put({
				type: types.GET_YOUTUBE_VIDEOS_SUCCESS,
				payload: res?.data?.data?.items,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_YOUTUBE_VIDEOS_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_YOUTUBE_VIDEOS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getYoutubePagination(Param) {
	const {params, token, cbSuccess, cbFailure} = Param;
	try {
		const res = yield axios.get(
			BASE_URL + ENDPOINTS.YOUTUBE_PAGINATION(params),
			{
				headers: getHeaders(token),
			},
		);

		if (res?.data) {
			cbSuccess(res?.data?.data);

			yield put({
				type: types.GET_YOUTUBE_VIDEOS_SUCCESS,
				payload: res?.data?.data?.items,
			});
		} else {
			cbFailure(res?.data);

			yield put({
				type: types.GET_YOUTUBE_VIDEOS_FAILURE,
				payload: res?.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);

		yield put({
			type: types.GET_YOUTUBE_VIDEOS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
