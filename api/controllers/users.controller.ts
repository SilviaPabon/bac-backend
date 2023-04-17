import { Request, Response } from 'express';
import { GetUsers } from '../models/users.model';

// This must be updated
export const handlerGetUsers = async (req: Request, res: Response) => {
	try {
		const users = await GetUsers();
		res.status(200).json({
			error: false,
			message: 'Users',
			users: users,
		});
	} catch (error) {
		res.status(500).json({ error: true });
	}
};
