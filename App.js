import React, {useEffect} from 'react';
import MainAppNav from './src/navigation';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import TrackPlayer from 'react-native-track-player';

console.disableYellowBox = true;

const App = () => {
	useEffect(() => {
		return () => {
			try {
				TrackPlayer.reset();
			} catch {
				// do something
			}
		};
	}, []);
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<MainAppNav />
			</PersistGate>
		</Provider>
	);
};

export default App;
