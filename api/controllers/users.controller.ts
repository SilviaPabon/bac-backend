import { Request, Response } from 'express';
import { AdminSignUpForm, Resident } from '../interfaces/interfaces';
import {
	GetUserByEmail,
	GetUserByIdentification,
	RegisterAdmin,
	RegisterResident,
} from '../models/users.model';
import { encryptPassword } from '../libs/helpers_bcrypt';
import { validateFields } from '../utils/utils';

// Handler Internal Staff Signup
export const handlerSignUp = async (req: Request, res: Response) => {
	try {
		// TODO
		const form: AdminSignUpForm = req.body;

		const [errField, message] = validateFields(form);
		if (errField) {
			res.status(400).json({ error: true, message: message });
			return;
		}

		const [existMail, _] = await GetUserByEmail(form.mail, 1);
		if (existMail) {
			res.status(409).json({ error: true, message: 'Email already exists' });
			return;
		}
		const existID = await GetUserByIdentification(form.identification_card, 1);
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

		const isUserRegister = await RegisterAdmin(form);
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

// Handler
export const handlerRegisterResident = async (req: Request, res: Response) => {
	try {
		const form: Resident = req.body;

		const [errField, message] = validateFields(form);
		if (errField) {
			res.status(400).json({ error: true, message: message });
			return;
		}

		const [existMail, _] = await GetUserByEmail(form.mail, 2);

		if (existMail) {
			res.status(409).json({ error: true, message: 'Email already exists' });
			return;
		}
		const existID = await GetUserByIdentification(form.identification_card, 2);
		if (existID) {
			res
				.status(409)
				.json({ error: true, message: 'Identification already exists' });
			return;
		}

		form.id_role = 2;

		const isUserRegister = await RegisterResident(form);
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
