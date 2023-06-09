import { IRequestWithUser } from '../interfaces/interfaces.js';
import { verifyAccessToken, verifyRefreshToken } from '../libs/helpers_jwt.js';
import { NextFunction, Response } from 'express';

// Checks if the token was provided it doesn't matter if it's an admin or a watchman
export const mustProvideAccessToken = (
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

	const [valid, decodedToken] = verifyAccessToken(token);
	if (!valid || !decodedToken) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, invalid token' });
		return;
	}

	req.id = decodedToken.id;
	req.id_role = decodedToken.id_role;

	next();
};

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

	const [valid, decodedToken] = verifyAccessToken(token);

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

	const [valid, decodedToken] = verifyAccessToken(token);
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

export const mustProvideRefreshToken = (
	req: IRequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	// Check the token was provided
	const headers = req.headers['x-refresh-token'];
	const bearer = Array.isArray(headers) ? headers[0] : headers;

	const token = bearer ? bearer.split(' ')[1] : undefined;
	if (!token) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, must provide token' });
		return;
	}

	console.log({ token });
	const [valid, decodedToken] = verifyRefreshToken(token);
	console.log({ valid, decodedToken });
	if (!valid || !decodedToken) {
		res
			.status(401)
			.json({ error: true, message: 'Unauthorized, invalid token' });
		return;
	}

	req.id = decodedToken.id;
	req.id_role = decodedToken.id_role;

	next();
};
