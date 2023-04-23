import { Request } from 'express';

export interface AdminSignUpForm {
	identification_card: string;
	name: string;
	mail: string;
	password: string;
	role: number;
}

export interface Resident {
	identification_card: string;
	name: string;
	mail: string;
	apartment: number;
	id_role: number;
}

export interface LoginForm {
	mail: string;
	password: string;
}

export interface IRequestWithUser extends Request {
	id?: string;
	id_role?: number;
}
