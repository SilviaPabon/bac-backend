import { encryptPassword } from '../api/libs/helpers_bcrypt.js';
import { RegisterAdmin } from '../api/models/users.model.js';

// --- --- --- --- --- ---
// Create initial admins
const admins = [
	{
		'identification_card': '123456789',
		'name': 'Pedro Chaparro',
		'mail': 'pedro.chaparro@gmail.com',
		'password': 'Upbbga2023*/',
		'role': 1,
	},
	{
		'identification_card': '234567891',
		'name': 'Silvia Pabon',
		'mail': 'silvia.pabon@gmail.com',
		'password': 'Upbbga2023*/',
		'role': 1,
	},
];

for await (const admin of admins) {
	const [error, hash] = await encryptPassword(admin.password);

	if (error) {
		console.log('Error encrypting admin password', error);
		process.exit(1);
	}

	await RegisterAdmin({ ...admin, password: hash });
}
