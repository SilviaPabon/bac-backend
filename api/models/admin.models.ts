import { Pool } from '../../database/database.js';

export const getResidents = async () => {
	try {
		const query = `
      SELECT identification_card, name, mail, apartment
      FROM residents
    `;

		const { rows } = await Pool.query(query);
		return [null, rows];
	} catch (error) {
		return [error, null];
	}
};
