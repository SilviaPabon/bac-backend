import { IRequestWithUser, LoginForm } from '../interfaces/interfaces.js';
import { matchPassword } from '../libs/helpers_bcrypt.js';
import {
	generateAccessToken,
	generateRefreshToken,
} from '../libs/helpers_jwt.js';
import {
	GetUserByEmail,
	GetUserByIdentification,
} from '../models/users.model.js';
import { validateFields } from '../utils/utils.js';
import { Request, Response } from 'express';

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

		const [err, accessToken] = generateAccessToken({
			id: user.identification_card,
			id_role: user.id_role,
		});

		const [errRe, refreshToken] = generateRefreshToken({
			id: user.identification_card,
			id_role: user.id_role,
		});

		if (err || errRe) {
			return res
				.status(500)
				.json({ error: true, message: `Internal Server Error. ${err}` });
		}

		return res.status(200).json({ error: false, accessToken, refreshToken });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: `Internal Server Error. ${error}` });
	}
};

// handleWhoami returns the user information from the access token
export const handleWhoami = async (req: IRequestWithUser, res: Response) => {
	try {
		// Get the token from the request
		const { id } = req;
		if (!id) {
			return res.status(401).json({
				error: true,
				message: 'Unauthorized, unable to get the user id',
			});
		}

		// Get the user information
		const user = await GetUserByIdentification(id, 1);
		if (!user) {
			return res.status(404).json({ error: true, message: 'User not found' });
		}

		return res.status(200).json({ error: false, user });
	} catch (_error) {
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error. Please, try again later',
		});
	}
};

export const handleRefreshToken = async (
	req: IRequestWithUser,
	res: Response,
) => {
	try {
		// Get the token from the request
		const { id } = req;
		if (!id) {
			return res.status(401).json({
				error: true,
				message: 'Unauthorized, unable to get the user id',
			});
		}

		// Get the user information
		const user = await GetUserByIdentification(id, 1);
		console.log(user);

		if (!user) {
			return res.status(404).json({ error: true, message: 'User not found' });
		}

		const [err, accessToken] = generateAccessToken({
			id: user.identification_card,
			id_role: user.id_role,
		});

		if (err) {
			return res
				.status(500)
				.json({ error: true, message: `Internal Server Error. ${err}` });
		}

		return res.status(200).json({ error: false, accessToken });
	} catch (_error) {
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error. Please, try again later',
		});
	}
};
