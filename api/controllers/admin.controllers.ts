import { encryptPassword } from '../libs/helpers_bcrypt.js';
import { getResidents } from '../models/admin.models.js';
import { GetUserByIdentification } from '../models/users.model.js';
import { RegisterAdmin } from '../models/users.model.js';
import { Request, Response } from 'express';

export const handleGetResidents = async (_req: Request, res: Response) => {
	try {
		const [error, residents] = await getResidents();

		if (error) {
			return res
				.status(500)
				.json({
					error: true,
					message:
						'Internal server error fetching the residents. Try again later.',
				});
		}

		return res
			.status(200)
			.json({
				error: false,
				message: 'Residents fetched successfully.',
				residents,
			});
	} catch (_error) {
		return res
			.status(500)
			.json({
				error: true,
				message: 'Internal Server Error. Try again later.',
			});
	}
};

export const handleStaffSignup = async (req: Request, res: Response) => {
	try {
		const { identification_card, name, mail, password, role } = req.body;

		// Check the role is valid
		if (role !== 1 && role !== 2) {
			return res.status(400).json({ error: true, message: 'Invalid role.' });
		}

		// Check if the user already exists
		const identificationExists = await GetUserByIdentification(
			identification_card,
			role,
		);
		if (identificationExists) {
			return res
				.status(400)
				.json({
					error: true,
					message: 'There is another user with the given identification card',
				});
		}

		// Check if the mail already exists
		const mailExists = await GetUserByIdentification(mail, role);
		if (mailExists) {
			return res
				.status(400)
				.json({
					error: true,
					message: 'There is another user with the given mail',
				});
		}

		// Hash the password
		const [err, hash] = await encryptPassword(password);
		if (err) {
			return res
				.status(500)
				.json({
					error: true,
					message: 'Internal Server Error. Try again later.',
				});
		}

		// Create the user
		const wasAdminCreated = await RegisterAdmin({
			identification_card,
			name,
			mail,
			role,
			'password': hash,
		});

		if (!wasAdminCreated) {
			return res
				.status(500)
				.json({
					error: true,
					message: 'Internal Server Error. Try again later.',
				});
		}

		return res
			.status(201)
			.json({ error: false, message: 'Admin created successfully.' });
	} catch (_error) {
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error. Try again later.',
		});
	}
};
