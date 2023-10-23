import {fork} from 'redux-saga/effects';
import {authRequests} from './auth-saga/auth-saga';
import {challengeRequests} from './challenges-saga/challenges-saga';
import {clientResourcesRequests} from './client-resources-saga/client-resources-saga';
import {leaderboardRequests} from './leaderboard-saga/leaderboard-saga';
import {legacyRequests} from './legacy-saga/legacy-saga';
import {onboardingRequests} from './onboarding-saga/onboarding-saga';
import {scheduledCallsRequests} from './schedule-call-saga/schedule-call-saga';
import {swotAnalysisRequests} from './swot-analysis-saga/swot-analysis-saga';
import {tasksRequests} from './task-saga/task-saga';
import {weeklyFormRequests} from './weekly-form-saga/weekly-form-saga';
import {winRateResourcesRequests} from './winrate-resources-saga/winrate-resources-saga';
import {notificationsRequests} from './notification-saga/notification-saga';

export function* rootSaga() {
	yield fork(authRequests);
	yield fork(onboardingRequests);
	yield fork(tasksRequests);
	yield fork(leaderboardRequests);
	yield fork(challengeRequests);
	yield fork(weeklyFormRequests);
	yield fork(legacyRequests);
	yield fork(clientResourcesRequests);
	yield fork(winRateResourcesRequests);
	yield fork(swotAnalysisRequests);
	yield fork(scheduledCallsRequests);
	yield fork(notificationsRequests);
}
