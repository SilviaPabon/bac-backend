import { Pool } from '../../database/database';

export const GetUsers = async () => {
	try {
		const query = 'SELECT cedula, mail, name FROM admins';
		const response = await Pool.query(query);
		return response.rows;
	} catch (error) {
		return null;
	}
};

export const GetUserByEmail = async (email: string) => {
	try {
		const query =
			'SELECT COUNT(*) AS EXISTS FROM USERS WHERE UPPER(USERS.MAIL) = UPPER($1)';
		const response = await Pool.query(query, [email]);
		if (response.rows[0]['exists'] === 1) return true;
		return false;
	} catch (error) {
		return null;
	}
};
