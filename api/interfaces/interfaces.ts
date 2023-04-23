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

interface Resident {
	identification_card: string;
	name: string;
	mail: string;
	apartment: number | null;
	id_role: number;
}
