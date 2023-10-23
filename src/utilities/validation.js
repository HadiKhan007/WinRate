import * as yup from 'yup';

export const loginFormFields = {
	email: '',
	password: '',
};

export const registerFormFields = {
	name: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: '',
};

export const registerEventFields = {
	name: '',
	email: '',
	phone: '',
};

export const updateProfileFormFileds = {
	userName: '',
	phoneNumber: '',
};

export const sendMailFormFields = {
	email: '',
};

export const resetPassFormFields = {
	password: '',
	confirmPassword: '',
};

export const updatePassFormFields = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
};

export const loginVS = yup.object().shape({
	email: yup
		.string()
		.required('Email Required')
		.email('Please provide a valid email address'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password Required'),
});

export const sendMailVS = yup.object().shape({
	email: yup
		.string()
		.required('Email Required')
		.email('Please provide a valid email address'),
});

export const resetPassVS = yup.object().shape({
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('New Password Required'),
	confirmPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Confirm Password Required')
		.oneOf([yup.ref('password'), null], 'New Password does not match'),
});

export const registerUser = yup.object().shape({
	name: yup.string().required('Name Required').label('name'),
	phone: yup
		.number()
		.typeError('Invalid contact number')
		.required('Contact Number Required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password Required'),
	confirmPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Confirm Password Required')
		.oneOf([yup.ref('password'), null], 'New Password does not match'),
});

export const registerForEvent = yup.object().shape({
	name: yup.string().required('Name Required').label('name'),
	email: yup
		.string()
		.required('Email Required')
		.email('Please provide a valid email address'),
	phone: yup
		.number()
		.typeError('Invalid contact number')
		.required('Contact Number Required'),
});

export const updatePassVS = yup.object().shape({
	currentPassword: yup.string().required('Current Password Required'),
	newPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('New Password Required')
		.oneOf([yup.ref('confirmPassword'), null], 'New Password does not match'),

	confirmPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Confirm Password Required')
		.oneOf([yup.ref('newPassword')], 'Confirm Password does not match'),
});

export const updateProfileVS = yup.object().shape({
	userName: yup.string().required('Name Required').label('name'),
	phoneNumber: yup
		.number()
		.typeError('Invalid contact number')
		.required('Phone Number Required'),
	twitter: yup.string().url().typeError('Invalid url'),
	instagram: yup.string().url().typeError('Invalid url'),
	facebook: yup.string().url().typeError('Invalid url'),
});
