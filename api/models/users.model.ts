import { Pool } from '../../database/database.js';
import { AdminSignUpForm, Resident } from '../interfaces/interfaces.js';

export const GetUsers = async () => {
	try {
		const query = 'SELECT cedula, mail, name FROM admins';
		const response = await Pool.query(query);
		return response.rows;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const GetUserByEmail = async (email: string, flag: number) => {
	const queries: { [key: number]: { table: string; fields: string } } = {
		1: {
			table: 'ADMINS',
			fields: 'IDENTIFICATION_CARD, MAIL, ID_ROLE, PASSWORD, NAME',
		},
		2: {
			table: 'RESIDENTS',
			fields: 'IDENTIFICATION_CARD, MAIL, ID_ROLE, NAME',
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
		console.log(error);
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
		console.log(table, identification);
		const query = `SELECT IDENTIFICATION_CARD, NAME, MAIL, ID_ROLE FROM ${table} WHERE IDENTIFICATION_CARD = $1`;
		const response = await Pool.query(query, [identification]);

		if (response.rows.length === 1) {
			return response.rows[0];
		} else {
			return null;
		}
	} catch (error) {
		console.log('error', error);
		return null;
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
			newUser.role,
		];
		const response = await Pool.query(query, values);
		if (response.rowCount === 0) {
			return false;
		}
		return true;
	} catch (error) {
		console.log(error);
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
		console.log(error);
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
		console.log(error);
		return null;
	}
};

export const UpdateResident = async (
	idResident: string,
	residentData: Resident,
) => {
	try {
		const query =
			'UPDATE RESIDENTS SET NAME = $1, MAIL = $2, APARTMENT = $3 WHERE IDENTIFICATION_CARD = $4';

		const response = await Pool.query(query, [
			residentData.name,
			residentData.mail,
			residentData.apartment,
			idResident,
		]);
		if (response.rowCount === 0) {
			return false;
		}
		return true;
	} catch (error) {
		console.log(error);
		return null;
	}
};
