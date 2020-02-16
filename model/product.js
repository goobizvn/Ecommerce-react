const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	quantity: {
		type: Number,
		default: Math.floor(Math.random() * 16) + 5
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	name: String,
	price: Number,
	isFreeShipping: {
		type: Boolean,
		default: true
	},
	currencyId: {
		type: Number,
		enum: [1, 2, 3],
		default: 3
	},
	image: {
		title: String,
		url: String
	}
});

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

ProductSchema.statics.search = function(productName, cb) {
	const regex = new RegExp(escapeRegex(productName), 'gi');
	return this.find(
		{
			name: regex
		},
		cb
	);
};

module.exports = mongoose.model('Product', ProductSchema);
