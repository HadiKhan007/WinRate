import * as TYPES from '../../types';

export const createChampionShipTaskRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.CREATE_CHAMPIONSHIP_TASK_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const createActionItemTaskRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.CREATE_ACTION_ITEM_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const createNoteToCoachRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.CREATE_NOTE_TO_COACH_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getNotesRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_NOTES_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getNotesByCoachRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.NOTES_BY_COACH_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};
