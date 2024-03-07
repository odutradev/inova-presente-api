import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email:{
		type: String,
		unique: true
	},
	role: {
		type: String,
		default: "normal"
	},
	password: {
		type: String
	},
});

export default mongoose.model('user', UserSchema);
