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
