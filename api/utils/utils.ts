// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const validateFields = (obj: { [key: string]: any }) => {
	for (const key in obj) {
		if (!obj[key]) {
			return [true, `${key} cannot be empty`];
		}
	}
	return [false, ''];
};
