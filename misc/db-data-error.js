const DATA_KEY = 'data';
const ERROR_KEY = 'error';
export default {
	getControllerData: function (data) {
		return [null, data];
	},
	getControllerError: function (error, message) {
		if (!error && message) {
			error = this.generateError(message);
		}
		return [error, null];
	},
	getData: function (input) {
		return input[DATA_KEY];
	},
	hasError: function (input) {
		return ERROR_KEY in input;
	},
	generateData: function (data) {
		return {
			[DATA_KEY]: data,
		};
	},
	generateError: function (error) {
		const message = error ? (typeof error === 'string' ? error : error.message) : null;
		return {
			[ERROR_KEY]: {
				message,
			},
		};
	},
};
