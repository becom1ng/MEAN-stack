import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import products from './routes/products.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const port = process.env.PORT || 3000;

// Get the directory name (needed with ESmodules instead of commonjs)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//  Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);
app.use('/api/products', products);

// Error handler
app.use(notFound);
app.use(errorHandler);

// Establish DB connection and start server
await mongoose
	.connect('mongodb://127.0.0.1:27017/') // , { autoIndex: false }) // disable auto indexing for production
	.then(() => {
		console.log('Connected to MongoDB!');
		app.listen(port, () => {
			console.log(`Server is running on port ${port}.`);
		});
	})
	.catch((_err) => console.log('Error connecting to MongoDB.'));
