import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Product name is required.'],
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		image: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model('Product', ProductSchema);

// ! If you use multiple connections, you should make sure you export schemas, not models. Exporting a model from a file is called the export model pattern. The export model pattern is limited because you can only use one connection. https://mongoosejs.com/docs/connections.html
export default Product;
