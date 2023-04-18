import { Request, Response } from 'express';
import { AdminSignUpForm } from '../interfaces/interfaces';
import { GetUserByEmail } from '../models/users.model';

// Handler Internal Staff Signup
export const handlerSignUp = async (req: Request, res: Response) => {
	try {
		const form: AdminSignUpForm = req.body;

		// todo something to parse o validate email?

		if (!form.email) {
			res.status(400).json({ error: true, message: 'Email cannot be empty' });
			return;
		}

		if (!form.password) {
			res
				.status(400)
				.json({ error: true, message: 'Password cannot be empty' });
			return;
		}

		if (await GetUserByEmail(form.email)) {
			res.status(409).json({ error: true, message: 'Email already exists' });
			return;
		}

		// todo encrypt pass
		// todo save user
		/* if (err) {
			res.status(400).json({ error: true, message: 'Email already exists' });
			return;
		} */

		res
			.status(200)
			.json({ error: false, message: 'User registered successfully' });
	} catch (error) {
		res
			.status(500)
			.json({ error: true, message: 'Internal server error, creating user' });
	}
};
