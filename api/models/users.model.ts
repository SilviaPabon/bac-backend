import { Pool } from '../../database/database';
import { AdminSignUpForm } from '../interfaces/interfaces';

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
			'SELECT COUNT(*) AS EXISTS FROM ADMINS WHERE UPPER(ADMINS.MAIL) = UPPER($1)';
		const response = await Pool.query(query, [email]);
		if (response.rows[0]['exists'] === '1') {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return error;
	}
};

export const GetUserByIdentification = async (identification: string) => {
	try {
		const query =
			'SELECT COUNT(*) AS EXISTS FROM ADMINS WHERE ADMINS.IDENTIFICATION_CARD = $1';
		const response = await Pool.query(query, [identification]);
		if (response.rows[0]['exists'] === '1') {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return error;
	}
};

export const RegisterUser = async (newUser: AdminSignUpForm) => {
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
		return true;
	}
};
