import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Name cannot be empty.'
  },
  email: {
    type: String,
    required: 'Email cannot be empty.',
    unique: true
  },
  password: {
    type: String,
    required: 'Password cannot be empty.',
    minLength: [8, 'Password must be minimum 8 characters long.']
  },
  salt: String,
  following: [],
  createdAt: Date,
  photos: [{
    name: String,
    data: Buffer,
    encoding: String,
    mimetype: String,
    size: Number
  }]
});

//Validations
userSchema.path('email').validate((email) => {
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  return regex.test(email);
}, 'Invalid email.');

userSchema.path('password').validate((password) => {
  let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  return regex.test(password);
}, 'Invalid password format.');



userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.salt = salt;
      next();
    });
  });
});

//Methods
userSchema.methods.verifyPassword = async function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateToken = async function() {
  return jsonwebtoken.sign({ _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    });
}

export default model('User', userSchema);
