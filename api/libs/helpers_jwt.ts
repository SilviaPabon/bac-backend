import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CONFIG } from '../configs/configs';

dotenv.config();

interface IPayload {
	mail: string;
}

export const generateToken = (payload: IPayload): [boolean | null, string] => {
	try {
		const token = jwt.sign(payload, CONFIG.JWT_SECRET, {
			expiresIn: '10m',
			subject: payload.mail,
		});

		return [false, token];
	} catch (error) {
		return [true, ''];
	}
};

export const verifyToken = (
	token: string,
): [boolean | null, IPayload | null] => {
	try {
		const claims = jwt.verify(token, CONFIG.JWT_SECRET);
		return [false, claims as IPayload];
	} catch (error) {
		return [true, null];
	}
};
