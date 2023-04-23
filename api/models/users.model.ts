import { Pool } from '../../database/database';
import { AdminSignUpForm, Resident } from '../interfaces/interfaces';

export const GetUsers = async () => {
	try {
		const query = 'SELECT cedula, mail, name FROM admins';
		const response = await Pool.query(query);
		return response.rows;
	} catch (error) {
		return null;
	}
};

export const GetUserByEmail = async (email: string, flag: number) => {
	const queries: { [key: number]: { table: string; fields: string } } = {
		1: {
			table: 'ADMINS',
			fields: 'MAIL, PASSWORD',
		},
		2: {
			table: 'RESIDENTS',
			fields: 'MAIL',
		},
	};

	const { table, fields } = queries[flag];

	try {
		const query = `SELECT ${fields} FROM ${table} WHERE UPPER(${table}.MAIL) = UPPER($1)`;
		const response = await Pool.query(query, [email]);
		if (response.rowCount === 1) {
			const user = response.rows[0];
			return [true, user];
		} else {
			return [false, null];
		}
	} catch (error) {
		return [false, null];
	}
};

export const GetUserByIdentification = async (
	identification: string,
	flag: number,
) => {
	const queries: { [key: number]: { table: string } } = {
		1: {
			table: 'ADMINS',
		},
		2: {
			table: 'RESIDENTS',
		},
	};

	const { table } = queries[flag];
	try {
		const query = `SELECT COUNT(*) AS EXISTS FROM ${table} WHERE IDENTIFICATION_CARD = $1`;
		const response = await Pool.query(query, [identification]);
		if (response.rows[0]['exists'] === '1') {
			console.log('exists');
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const RegisterAdmin = async (newUser: AdminSignUpForm) => {
	try {
		const query =
			'INSERT INTO ADMINS (IDENTIFICATION_CARD, NAME, MAIL, PASSWORD, ID_ROLE) VALUES ($1, $2, $3, $4, $5)';
		const values = [
			newUser.identification_card,
			newUser.name,
			newUser.mail,
			newUser.password,
			newUser.id_role,
		];
		const response = await Pool.query(query, values);
		if (response.rowCount === 0) {
			return false;
		}
		return true;
	} catch (error) {
		return null;
	}
};

export const RegisterResident = async (newUser: Resident) => {
	try {
		const query =
			'INSERT INTO RESIDENTS (IDENTIFICATION_CARD, NAME, MAIL, APARTMENT, ID_ROLE) VALUES ($1, $2, $3, $4, $5)';
		const values = [
			newUser.identification_card,
			newUser.name,
			newUser.mail,
			newUser.apartment,
			newUser.id_role,
		];
		const response = await Pool.query(query, values);
		if (response.rowCount === 0) {
			return false;
		}
		return true;
	} catch (error) {
		return null;
	}
};

export const DeleteResident = async (idResident: string) => {
	try {
		const query = 'DELETE FROM RESIDENTS WHERE IDENTIFICATION_CARD = $1';

		const response = await Pool.query(query, [idResident]);
		if (response.rowCount === 0) {
			return false;
		}
		return true;
	} catch (error) {
		return null;
	}
};

export const UpdateResident = async (idResident: string) => {
	try {
		const query = 'DELETE FROM RESIDENTS WHERE IDENTIFICATION_CARD = $1';

		const response = await Pool.query(query, [idResident]);
		if (response.rowCount === 0) {
			return false;
		}
		return true;
	} catch (error) {
		return null;
	}
};
