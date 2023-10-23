import {combineReducers} from 'redux';

import authReducer from './auth-reducers/auth-reducer';
import challengeReducer from './challenges-reducer/challenges-reducer';
import clientResourcesReducer from './client-resources-reducer/client-resources-reducer';
import leaderboardReducer from './leaderboard-reducer/leaderboard-reducer';
import legacyReducer from './legacy-reducers/legacy-reducers';
import onboardingReducer from './onboarding-reducer/onboarding-reducer';
import scheduleCallReducer from './schedule-call-reducer/schedule-call-reducer';
import swotAnalysisReducer from './swot-analysis-reducer/swot-analysis-reducer';
import taskReducer from './task-reducer/task-reducer';
import weeklyFormsReducer from './weekly-form-reducer/weekly-form-reducer';
import winRateResourcesReducer from './winrate-resources-reducer/winrate-resources-reducer';
import notificationReducer from './notification-reducer/notification-reducer';

let rootReducer;

export default rootReducer = combineReducers(
	Object.assign({
		auth: authReducer,
		onboarding: onboardingReducer,
		tasks: taskReducer,
		leaderboard: leaderboardReducer,
		challenges: challengeReducer,
		weeklyForms: weeklyFormsReducer,
		legacy: legacyReducer,
		clientResources: clientResourcesReducer,
		winRateResources: winRateResourcesReducer,
		swotAnalysis: swotAnalysisReducer,
		scheduledCall: scheduleCallReducer,
		notifications: notificationReducer,
	}),
);
