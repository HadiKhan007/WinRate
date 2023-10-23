import * as TYPES from '../../types';

const initialState = {
	apparel: [],
	youtubeVideos: [],
	podcasts: [],
};

const winRateResourcesReducer = (state = initialState, actions) => {
	const {type, payload} = actions;
	switch (type) {
	case TYPES.GET_APPAREL_SUCCESS:
		return {
			...state,
			apparel: payload,
		};
	case TYPES.GET_APPAREL_FAILURE:
		return {
			...state,
			apparel: [],
		};
	case TYPES.GET_YOUTUBE_VIDEOS_SUCCESS:
		return {
			...state,
			youtubeVideos: payload,
		};
	case TYPES.GET_YOUTUBE_VIDEOS_FAILURE:
		return {
			...state,
			youtubeVideos: [],
		};
	case TYPES.YOUTUBE_PAGINATION_SUCCESS:
		return {
			...state,
			youtubeVideos: payload,
		};
	case TYPES.YOUTUBE_PAGINATION_FAILURE:
		return {
			...state,
			youtubeVideos: [],
		};
	case TYPES.GET_PODCASTS_SUCCESS:
		return {
			...state,
			podcasts: payload,
		};
	case TYPES.GET_PODCASTS_FAILURE:
		return {
			...state,
			podcasts: [],
		};
	default:
		return state;
	}
};
export default winRateResourcesReducer;
