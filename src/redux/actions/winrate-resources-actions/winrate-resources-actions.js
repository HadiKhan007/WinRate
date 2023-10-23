import * as TYPES from '../../types/winrate-resources-types/winrate-resources-types';

export const getApparelRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_APPAREL_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getPodcastsRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_PODCASTS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const getYoutubeVideosRequest = (token, cbSuccess, cbFailure) => {
	return {
		type: TYPES.GET_YOUTUBE_VIDEOS_REQUEST,
		token,
		cbSuccess,
		cbFailure,
	};
};

export const youtubePaginationRequest = (
	params,
	token,
	cbSuccess,
	cbFailure,
) => {
	return {
		type: TYPES.YOUTUBE_PAGINATION_REQUEST,
		params,
		token,
		cbSuccess,
		cbFailure,
	};
};
