import {useSelector} from 'react-redux';

const meterHook = () => {
	const {user} = useSelector(state => state.auth);

	const meterMilestonePerentage = () => {
		try {
			if (user && user?.winRating <= 7) {
				const val = (user?.winRating / 7) * 100;
				const result = {
					value: val,
					target: 7,
				};
				return result;
			} else if (user && user?.winRating <= 30 && user?.winRating > 7) {
				const val = (user?.winRating / 30) * 100;
				const result = {
					value: val,
					target: 30,
				};
				return result;
			} else if (user && user?.winRating <= 75 && user?.winRating > 30) {
				const val = (user?.winRating / 75) * 100;
				const result = {
					value: val,
					target: 75,
				};
				return result;
			} else if (user && user?.winRating <= 125 && user?.winRating > 75) {
				const val = (user?.winRating / 125) * 100;
				const result = {
					value: val,
					target: 125,
				};
				return result;
			} else if (user && user?.winRating <= 250 && user?.winRating > 125) {
				const val = (user?.winRating / 250) * 100;
				const result = {
					value: val,
					target: 250,
				};
				return result;
			} else if (user && user?.winRating > 250) {
				const val = (user?.winRating / 10000) * 100;
				const result = {
					value: val,
					target: 10000,
				};
				return result;
			}
		} catch (error) {
			return 0;
		}
	};

	return {meterMilestonePerentage};
};

export {meterHook};
