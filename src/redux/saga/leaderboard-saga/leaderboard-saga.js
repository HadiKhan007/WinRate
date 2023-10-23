import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* leaderboardRequests() {
	yield takeLatest(types.GET_LEADERBOARD_USERS_REQUEST, getLeaderBoardUsers);
	yield takeLatest(
		types.GET_LEADERBOARD_USER_DETAILS_REQUEST,
		getLeaderBoardUsersDetails,
	);
	yield takeLatest(types.CHALLENGE_USER_REQUEST, challengeUser);
}

function* getLeaderBoardUsers(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.GET_ALL_USERS, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const { users } = response?.data?.data;
			cbSuccess(users);

			yield put({
				type: types.GET_LEADERBOARD_USERS_SUCCESS,
				payload: users,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_LEADERBOARD_USERS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_LEADERBOARD_USERS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getLeaderBoardUsersDetails(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.GET_LEADERBOARD_USER + params, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const { user } = response?.data?.data;
			cbSuccess(user);

			yield put({
				type: types.GET_LEADERBOARD_USER_DETAILS_SUCCESS,
				payload: user,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_LEADERBOARD_USER_DETAILS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_LEADERBOARD_USER_DETAILS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* challengeUser(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(
			BASE_URL + ENDPOINTS.CHALLENGE_USER,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.CHALLENGE_USER_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.CHALLENGE_USER_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.CHALLENGE_USER_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
