const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    question: String,
	answer: String,
	weight: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

MessageSchema.statics.search = function(question, cb) {
	const regex = new RegExp(escapeRegex(question), 'gi');
	return this.find(
		{
			question: regex
		},
		cb
	);
};

module.exports = mongoose.model('Message', MessageSchema);
