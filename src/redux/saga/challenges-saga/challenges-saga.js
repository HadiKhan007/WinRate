import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {BASE_URL, ENDPOINTS, getHeaders} from '../../../utilities';
import * as types from '../../types';

axios.defaults.timeout = 10000;

export function* challengeRequests() {
	yield takeLatest(types.GET_CHAMPIONSHIP_TASK_REQUEST, getChampionShipTasks);
	yield takeLatest(
		types.COMPLETE_CHAMPIONSHIP_TASK_REQUEST,
		completeChampionShipTask,
	);
	yield takeLatest(types.GET_ACTION_ITEM_REQUEST, getActionItem);
	yield takeLatest(types.COMPLETE_ACTION_ITEM_REQUEST, completeActionItem);
	yield takeLatest(types.GET_ACTIVE_CHALLENGE_REQUEST, getActiveChallenges);
	yield takeLatest(types.GET_INACTIVE_CHALLENGE_REQUEST, getInActiveChallenges);
	yield takeLatest(types.KICK_ASS_REQUEST, kickAss);
	yield takeLatest(types.ACCEPT_CHALLENGE_REQUEST, acceptChallenge);
	yield takeLatest(types.REJECT_CHALLENGE_REQUEST, rejectChallenge);
	yield takeLatest(types.GET_STREAKS_RECORD_REQUEST, getStreaks);
	yield takeLatest(types.DELETE_ACTION_ITEMS_REQUEST, deleteActionItems);
	yield takeLatest(
		types.DELETE_CHAMPIONSHIP_TASK_REQUEST,
		deleteChampionshipTasks,
	);
}

function* getChampionShipTasks(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.ALL_CHAMPIONSHIP, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {tasks} = response?.data?.data;
			if (tasks.length > 0) {
				const myself = tasks[0]?.data;
				const myselfFilter = tasks[0]?.data?.filter(
					item => item?.isCompleted === true,
				);
				const business = tasks[1]?.data;
				const businessFilter = tasks[1]?.data?.filter(
					item => item?.isCompleted === true,
				);
				const someone = tasks[2]?.data;
				const someoneFilter = tasks[2]?.data?.filter(
					item => item?.isCompleted === true,
				);

				if (
					myself?.length === myselfFilter?.length &&
					business?.length === businessFilter?.length &&
					someone?.length === someoneFilter?.length
				) {
					yield put({
						type: types.ALL_TASKS_COMPLETED,
						payload: true,
					});
				} else {
					yield put({
						type: types.ALL_TASKS_COMPLETED,
						payload: false,
					});
				}
			}
			cbSuccess(tasks);

			const arrage = [
				{category: 'myself', data: []},
				{category: 'someone', data: []},
				{category: 'business', data: []},
			];

			arrage.map(obj => {
				tasks.find(objs =>
					obj?.category === objs?.category ? obj?.data.push(...objs?.data) : '',
				);
			});

			yield put({
				type: types.GET_CHAMPIONSHIP_TASK_SUCCESS,
				payload: arrage,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_CHAMPIONSHIP_TASK_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_CHAMPIONSHIP_TASK_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* completeChampionShipTask(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.MARK_CHAMPIONSHIP,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.COMPLETE_CHAMPIONSHIP_TASK_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.COMPLETE_CHAMPIONSHIP_TASK_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.COMPLETE_CHAMPIONSHIP_TASK_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getActionItem(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.ALL_ACTION_ITEM, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {tasks} = response?.data?.data;
			cbSuccess(tasks);

			yield put({
				type: types.GET_ACTION_ITEM_SUCCESS,
				payload: tasks,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_ACTION_ITEM_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_ACTION_ITEM_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* completeActionItem(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.MARK_ACTION_ITEM,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.COMPLETE_ACTION_ITEM_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.COMPLETE_ACTION_ITEM_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.COMPLETE_ACTION_ITEM_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getActiveChallenges(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.ALL_CHALLENGES, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {challenges} = response?.data?.data;
			cbSuccess(challenges);

			let data = [];
			if (challenges.length > 0) {
				data = challenges
					.filter(item => item?.status !== 'rejected')
					.filter(obj => obj.status !== 'completed' && obj.status !== true);
			}

			yield put({
				type: types.GET_ACTIVE_CHALLENGE_SUCCESS,
				payload: data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_ACTIVE_CHALLENGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_ACTIVE_CHALLENGE_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getInActiveChallenges(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.ALL_CHALLENGES, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			const {challenges} = response?.data?.data;
			cbSuccess(challenges);

			let data = [];
			if (challenges.length > 0) {
				data = challenges?.filter(
					item => item?.isCompleted == true && item?.status !== 'rejected',
				);
			}

			yield put({
				type: types.GET_INACTIVE_CHALLENGE_SUCCESS,
				payload: data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_INACTIVE_CHALLENGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_INACTIVE_CHALLENGE_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* kickAss(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.post(BASE_URL + ENDPOINTS.KICK_ASS, params, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.KICK_ASS_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.KICK_ASS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.KICK_ASS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* acceptChallenge(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.ACCEPT_CHALLENGE,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.ACCEPT_CHALLENGE_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.ACCEPT_CHALLENGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.ACCEPT_CHALLENGE_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* rejectChallenge(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.patch(
			BASE_URL + ENDPOINTS.REJECT_CHALLENGE,
			params,
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.REJECT_CHALLENGE_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.REJECT_CHALLENGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.REJECT_CHALLENGE_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* getStreaks(Params) {
	const {token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.get(BASE_URL + ENDPOINTS.STREAKS, {
			headers: getHeaders(token),
		});

		if (response?.data) {
			cbSuccess(response?.data?.data);
			const {streak} = response?.data?.data;

			yield put({
				type: types.GET_STREAKS_RECORD_SUCCESS,
				payload: streak,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.GET_STREAKS_RECORD_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.GET_STREAKS_RECORD_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* deleteActionItems(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.delete(
			BASE_URL + ENDPOINTS.DELETE_ACTION_ITEM(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.DELETE_ACTION_ITEMS_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.DELETE_ACTION_ITEMS_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.DELETE_ACTION_ITEMS_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}

function* deleteChampionshipTasks(Params) {
	const {params, token, cbSuccess, cbFailure} = Params;

	try {
		const response = yield axios.delete(
			BASE_URL + ENDPOINTS.DELETE_CHAMPIONSHIP(params),
			{
				headers: getHeaders(token),
			},
		);

		if (response?.data) {
			cbSuccess(response?.data?.data);

			yield put({
				type: types.DELETE_CHAMPIONSHIP_TASK_SUCCESS,
				payload: response.data,
			});
		} else {
			cbFailure(response);

			yield put({
				type: types.DELETE_CHAMPIONSHIP_TASK_FAILURE,
				payload: response.data,
			});
		}
	} catch (error) {
		cbFailure(error?.response?.data?.message);
		yield put({
			type: types.DELETE_CHAMPIONSHIP_TASK_FAILURE,
			payload: error?.response?.data?.message,
		});
	}
}
