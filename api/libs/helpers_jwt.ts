import { CONFIG } from '../configs/configs.js';
import jwt from 'jsonwebtoken';

interface IPayload {
	id: string;
	id_role: number;
}

export const generateAccessToken = (
	payload: IPayload,
): [boolean | null, string] => {
	try {
		const token = jwt.sign(payload, CONFIG.JWT_SECRET, {
			expiresIn: '10m',
		});

		return [false, token];
	} catch (error) {
		return [true, `${error}`];
	}
};

export const generateRefreshToken = (
	payload: IPayload,
): [boolean | null, string] => {
	try {
		const token = jwt.sign(payload, CONFIG.JWT_REFRESH_SECRET, {
			expiresIn: '24h',
		});

		return [false, token];
	} catch (error) {
		return [true, `${error}`];
	}
};

export const verifyAccessToken = (
	token: string,
): [boolean, IPayload | null] => {
	try {
		const claims = jwt.verify(token, CONFIG.JWT_SECRET);
		return [true, claims as IPayload];
	} catch (error) {
		console.log(error);
		return [false, null];
	}
};

export const verifyRefreshToken = (
	token: string,
): [boolean, IPayload | null] => {
	try {
		const claims = jwt.verify(token, CONFIG.JWT_REFRESH_SECRET);
		return [true, claims as IPayload];
	} catch (error) {
		console.log(error);
		return [false, null];
	}
};
