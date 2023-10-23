//BASEURL
//TODO:
const isProduction = false;
const BASE_URL = isProduction
	? 'https://api.winrateapp.com/api/v1/'
	: 'https://dev.winrateapp.com/api/v1/';

const ENDPOINTS = {
	LOGIN: 'login',
	SIGNUP: 'register',
	FORGOTPASSWORD: 'forgot-password',
	VERIFYOTP: 'verify-otp',
	RESETPASSWORD: 'reset-password',
	UPDATEPASSWORD: 'client/change-password',
	UPDATEPROFILE: 'client/update',
	PROFILE: 'client/profile',
	UPLOAD_IMG: 'upload-one',
	DELETE_USER: id => `user/client/${id}`,
	UPDATE_FCM: 'client/fcm-token',
	DESTROY_FCM: 'client/logout',
	SUPPORT: 'client/contact/create',
	GET_EMAIL: id => `invite?key=${id}`,

	ONBORADING: 'client/onboarding',
	ONBOARDING_FORM: '/answers',
	CREATE_ONBOARDING: '/add-answers',

	CREATE_ACTION_ITEM: 'client/action-item/create',
	MARK_ACTION_ITEM: 'client/action-item/mark-complete',
	ALL_ACTION_ITEM: 'client/action-item',
	DELETE_ACTION_ITEM: id => `client/action-item/${id}`,

	CREATE_CHAMPIONSHIP: 'client/championship/create',
	MARK_CHAMPIONSHIP: 'client/championship/mark-complete',
	ALL_CHAMPIONSHIP: 'client/championship',
	DELETE_CHAMPIONSHIP: id => `client/championship/${id}`,

	ALL_CHALLENGES: 'client/challenge',
	ACCEPT_CHALLENGE: 'client/challenge',
	REJECT_CHALLENGE: 'client/challenge',
	KICK_ASS: 'client/challenge/kick-ass',

	CREATE_COACH_NOTE: 'client/notes/create',
	ALL_NOTES: 'client/notes',
	COACH_NOTES: 'client/notes/coach-notes',

	GET_ALL_USERS: 'client/leaderboard',
	GET_LEADERBOARD_USER: 'client/profile/',
	CHALLENGE_USER: 'client/challenge/create',

	GET_ALL_LEGACY: 'client/legacy',
	CREATE_LEGACY: 'client/legacy/create',
	UPADTE_DELETE_LEGACY: id => `client/legacy/${id}`,
	DELETE_LEGACY: 'client/legacy',

	WEEKLY_QUESTIONS: 'client/checkinform/active',
	CREATE_WEEKLY_ANSWERS: 'client/checkinform/create',
	WEEKLY_ANSWERS: 'client/checkinform',

	SWOT: 'client/swot-analysis',
	CREATE_SWOT: 'client/swot-analysis/create',

	COURSES: 'resources/courses',
	SEARCH_COURSES: text => `resources/course/search?title=${text}`,

	EVENTS: id => `resources/events?email=${id}`,
	EVENT_DETAILS: id => `resources/events/${id}`,
	REGISTER_EVENT: 'resources/event/register',

	CALL_RECORDINGS: 'client/call/merged/calls',

	HUDDLE: 'client/call-library/huddle-merged',

	PODCASTS: 'resources/podcast',

	YOUTUBE: 'resources/youtube-videos',
	YOUTUBE_PAGINATION: id => `resources/youtube-videos?pageToken=${id}`,

	APPAREL: 'resources/apparel',

	STREAKS: 'client/streak',

	VERIFY_KEY: text => `invite?key=${text}`,

	SCHEDULED_CALLS: 'client/call',
	SCHEDULED_HUDDLE_CALLS: 'client/call/huddle/fetch',

	JOIN_CALL: 'client/call/join-call',
	HUDDLE_CALL: 'client/call/huddle/join-call',

	NOTIFICATIONS: id => `notification/${id}`,
	NOTIFY: 'notifications',
	DELETE_NOTIFY: id => `notification/delete/${id}`,
	MARK_ALL_NOTIFY: 'notifications/mark',
};

export {BASE_URL, ENDPOINTS};
