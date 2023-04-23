import { Request, Response } from 'express';
import { AdminSignUpForm } from '../interfaces/interfaces';
import {
	GetUserByEmail,
	GetUserByIdentification,
	RegisterUser,
} from '../models/users.model';
import { encryptPassword } from '../libs/helpers';
import { validateFields } from '../utils/utils';

// Handler Internal Staff Signup
export const handlerSignUp = async (req: Request, res: Response) => {
	try {
		const form: AdminSignUpForm = req.body;

		const [errField, message] = validateFields(form);
		if (errField) {
			res.status(400).json({ error: true, message: message });
			return;
		}

		const exisMail = await GetUserByEmail(form.mail);
		if (exisMail) {
			res.status(409).json({ error: true, message: 'Email already exists' });
			return;
		}
		const existID = await GetUserByIdentification(form.identification_card);
		if (existID) {
			res
				.status(409)
				.json({ error: true, message: 'Identification already exists' });
			return;
		}

		const [errEncrypt, hash] = await encryptPassword(form.password);
		if (errEncrypt) {
			res
				.status(500)
				.json({ error: true, message: `Internal Server Error ${errEncrypt}` });
			return;
		}

		form.password = hash;
		form.id_role = 1;

		const isUserRegister = await RegisterUser(form);
		if (!isUserRegister) {
			res.status(500).json({
				error: true,
				message: 'Internal Server Error, unable to create user.',
			});
			return;
		}

		res
			.status(201)
			.json({ error: false, message: 'User registered successfully' });
	} catch (error) {
		res
			.status(500)
			.json({ error: true, message: 'Internal server error, creating user' });
	}
};
