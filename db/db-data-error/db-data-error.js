const DATA_KEY = 'data';
const ERROR_KEY = 'error';
module.exports = {
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
		const message = error ? error.message : null;
		return {
			[ERROR_KEY]: {
				message,
			},
		};
	},
};
