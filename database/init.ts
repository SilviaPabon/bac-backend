import { encryptPassword } from '../api/libs/helpers_bcrypt.js';
import { RegisterAdmin } from '../api/models/users.model.js';

// --- --- --- --- --- ---
// Create initial admins
const internals = [
	{
		'identification_card': '123456789',
		'name': 'Pedro Chaparro',
		'mail': 'pedro.chaparro.admin@gmail.com',
		'password': 'Upbbga2023*/',
		'role': 1,
	},
	{
		'identification_card': '234567891',
		'name': 'Silvia Pabon',
		'mail': 'silvia.pabon.admin@gmail.com',
		'password': 'Upbbga2023*/',
		'role': 1,
	},
	{
		'identification_card': '345678912',
		'name': 'Pedro Chaparro',
		'mail': 'pedro.chaparro.watchman@gmail.com',
		'password': 'Upbbga2023*/',
		'role': 2,
	},
	{
		'identification_card': '456789123',
		'name': 'Silvia Pabon',
		'mail': 'silvia.pabon.watchman@gmail.com',
		'password': 'Upbbga2023*/',
		'role': 2,
	},
];

for await (const internal of internals) {
	const [error, hash] = await encryptPassword(internal.password);

	if (error) {
		console.log('Error encrypting internal password', error);
		process.exit(1);
	}

	await RegisterAdmin({ ...internal, password: hash });
}
