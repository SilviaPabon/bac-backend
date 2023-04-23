import { Request, Response } from 'express';
import { LoginForm } from '../interfaces/interfaces';
import { validateFields } from '../utils/utils';
import { GetUserByEmail } from '../models/users.model';
import { matchPassword } from '../libs/helpers_bcrypt';
import { generateToken } from '../libs/helpers_jwt';

// handlerLogin manage Login from any user
export const handlerLogin = async (req: Request, res: Response) => {
	try {
		const form: LoginForm = req.body;

		// Validates if some is empty
		const [errField, message] = validateFields(form);
		if (errField) {
			res.status(400).json({ error: true, message: message });
			return;
		}

		const [_, user] = await GetUserByEmail(form.mail, 1);
		if (!user) {
			return res.status(401).json({ error: true, message: 'Invalid email' });
		}

		// Check password
		const [__, isValidPassword] = await matchPassword(
			form.password,
			user.password,
		);
		if (!isValidPassword) {
			return res.status(401).json({ error: true, message: 'Invalid password' });
		}

		const [err, accessToken] = generateToken({
			id: user.identification_card,
			id_role: user.id_role,
		});

		if (err) {
			return res
				.status(500)
				.json({ error: true, message: `Internal Server Error. ${err}` });
		}

		return res.status(200).json({ error: false, accessToken });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: `Internal Server Error. ${error}` });
	}
};
