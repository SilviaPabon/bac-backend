import { NextFunction, Response } from 'express';
import { IRequestWithUser } from '../interfaces/interfaces';
import { verifyToken } from '../libs/helpers_jwt';

// Checks if is an admin
export const mustProvideTokenAdmin = (
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

	const [valid, decodedToken] = verifyToken(token);

	if (!valid) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, invalid token' });
		return;
	}

	if (decodedToken?.id_role !== 1) {
		return res
			.status(403)
			.json({ error: true, message: 'Forbidden, role not allowed' });
	}

	req.id = decodedToken.id;
	req.id_role = decodedToken.id_role;

	next();
};

// Checks if is a guard
export const mustProvideTokenGuard = (
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
	const [valid, decodedToken] = verifyToken(token);
	if (!valid) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, invalid token' });
		return;
	}

	if (decodedToken?.id_role !== 2) {
		return res
			.status(403)
			.json({ error: true, message: 'Forbidden, role not allowed' });
	}

	req.id = decodedToken.id;
	req.id_role = decodedToken.id_role;

	next();
};
