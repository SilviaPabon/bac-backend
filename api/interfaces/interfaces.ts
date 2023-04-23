export interface AdminSignUpForm {
	identification_card: string;
	name: string;
	mail: string;
	password: string;
	id_role: number;
}

export interface AdminLoginForm {
	mail: string;
	password: string;
}

export interface Resident {
	identification_card: string;
	name: string;
	mail: string;
	apartment: number;
	id_role: number;
}

export interface AdminLogin {
	mail: string;
}

export interface TRequestUser {
	mail: string;
}

export interface RequestUser extends Request {
	user?: TRequestUser;
}
