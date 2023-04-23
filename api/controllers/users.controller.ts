import { Request, Response } from 'express';
import { encryptPassword } from '../libs/helpers_bcrypt';
import { validateFields } from '../utils/utils';
import {
	DeleteResident,
	GetUserByEmail,
	UpdateResident,
	GetUserByIdentification,
	RegisterAdmin,
	RegisterResident,
} from '../models/users.model';
import {
	AdminSignUpForm,
	IRequestWithUser,
	Resident,
} from '../interfaces/interfaces';

// Handler Internal Staff Signup
export const handlerSignUp = async (req: Request, res: Response) => {
	try {
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
		res.status(500).json({
			error: true,
			message: `Internal server error, creating user. ${error}`,
		});
	}
};

// Handler
export const handlerRegisterResident = async (
	req: IRequestWithUser,
	res: Response,
) => {
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
		res.status(500).json({
			error: true,
			message: `Internal server error, creating user. ${error}`,
		});
	}
};

export const handlerDeleteResident = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		const user = await GetUserByIdentification(userId, 2);

		if (!user) {
			res.status(404).json({ error: true, message: 'User not found' });
			return;
		}

		const isDeleted = await DeleteResident(userId);

		if (!isDeleted) {
			res.status(500).json({
				error: true,
				message: 'Internal Server Error, unable to delete user.',
			});
			return;
		}
		res
			.status(200)
			.json({ error: false, message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({
			error: true,
			message: `Internal server error, deleting user. ${error}`,
		});
	}
};

export const handlerUpdateResident = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const residentData = req.body;

		const user = await GetUserByIdentification(userId, 2);

		if (!user) {
			res.status(404).json({ error: true, message: 'User not found' });
			return;
		}

		const isUpdated = await UpdateResident(userId, residentData);

		if (!isUpdated) {
			res.status(500).json({
				error: true,
				message: 'Internal Server Error, unable to update user.',
			});
			return;
		}
		res
			.status(200)
			.json({ error: false, message: 'User updated successfully' });
	} catch (error) {
		res.status(500).json({
			error: true,
			message: `Internal server error, updating user. ${error}`,
		});
	}
};
