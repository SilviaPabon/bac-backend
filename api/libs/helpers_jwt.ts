import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CONFIG } from '../configs/configs';

dotenv.config();

interface IPayload {
	id: string;
	id_role: number;
}

export const generateToken = (payload: IPayload): [boolean | null, string] => {
	try {
		const token = jwt.sign(payload, CONFIG.JWT_SECRET, {
			expiresIn: '10m',
		});

		return [false, token];
	} catch (error) {
		return [true, `${error}`];
	}
};

export const verifyToken = (
	token: string,
): [boolean | null, IPayload | null] => {
	try {
		const claims = jwt.verify(token, CONFIG.JWT_SECRET);
		return [true, claims as IPayload];
	} catch (error) {
		console.log(error);
		return [false, null];
	}
};
