export const CONFIG = {
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_refresh',
};
