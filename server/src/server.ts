import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

// Load environment variables from the .env file, where the LOCAL_URI is configured
dotenv.config();

// const { ATLAS_URI } = process.env; // use this if you have ATLAS_URI in your .env file
const { LOCAL_URI } = process.env;

if (!LOCAL_URI) {
	console.error(
		'No LOCAL_URI environment variable has been defined in config.env',
	);
	process.exit(1);
}

connectToDatabase(LOCAL_URI)
	.then(() => {
		const app = express();
		app.use(cors());

		// Routes
		app.use('/employees', employeeRouter);

		// Start the Express server
		app.listen(5200, () => {
			console.log(`Server running at http://localhost:5200...`);
		});
	})
	.catch((error) => console.error(error));
