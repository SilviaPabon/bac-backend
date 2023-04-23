import { NextFunction, Response } from 'express';
import { IRequestWithUser } from '../interfaces/interfaces';
import { verifyToken } from '../libs/helpers_jwt';

export const mustProvideToken = (
	req: IRequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	// Check the token was provided
	const headers = req.headers['x-access-token'];
	const bearer = Array.isArray(headers) ? headers[0] : headers;
	const token = bearer ? bearer.split(' ')[1] : undefined;

	if (!token) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, must provide token' });
		return;
	}

	console.log(token);
	const [valid, _] = verifyToken(token);
	if (!valid) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, invalid token' });
		return;
	}

	// TODO: Set the user id and role to the request
	req.id = '1';
	req.role = 'admin';

	next();
};
