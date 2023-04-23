import bcrypt from 'bcrypt';

export const encryptPassword = async (
	password: string,
): Promise<[boolean, string]> => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return [false, hash];
	} catch (error) {
		return [true, `${error}`];
	}
};

export const matchPassword = async (
	password: string,
	savedPassword: string,
) => {
	try {
		const match = await bcrypt.compare(password, savedPassword);
		return [false, match];
	} catch (e) {
		return [true, ''];
	}
};
