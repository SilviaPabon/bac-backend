import { Request, Response } from 'express';
import { AdminLoginForm } from '../interfaces/interfaces';
import { validateFields } from '../utils/utils';
import { GetUserByEmail } from '../models/users.model';
import { matchPassword } from '../libs/helpers_bcrypt';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../configs/configs';

export const handlerLogin = async (req: Request, res: Response) => {
	try {
		const form: AdminLoginForm = req.body;
		const [errField, message] = validateFields(form);
		if (errField) {
			res.status(400).json({ error: true, message: message });
			return;
		}

		const [_, user] = await GetUserByEmail(form.mail, 1);
		if (!user) {
			return res.status(401).json({ error: true, message: 'Invalid email' });
		}

		const [err, isValidPassword] = await matchPassword(
			form.password,
			user.password,
		);

		if (!isValidPassword) {
			return res.status(401).json({ error: true, message: 'Invalid password' });
		}

		// Improve
		const token = jwt.sign({ mail: user.mail }, CONFIG.JWT_SECRET, {
			expiresIn: '1h',
		});

		return res.status(200).json({ error: false, token });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: 'Internal Server Error' });
	}
};
