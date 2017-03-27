var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  name: {type: String, required: true, minlength: 2},
  email: {type: String, required: true, minlength: 6},
  state: {type: String, minlength: 2},
  zipCode: {type: Number, required: true},
  password: {type: String, required: true},
  memberships: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  following: [{type: Schema.Types.ObjectId, ref: 'Group'}]
}, {timestamps: true});

var GroupSchema = mongoose.Schema({
  name: {type: String, required: true, minlength: 2},
  admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  state: {type: String, minlength: 2},
  zipCode: {type: Number, required: true},
  password: {type: String, required: true},
  memberships: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  following: [{type: Schema.Types.ObjectId, ref: 'Group'}]
}, {timestamps: true});

mongoose.model('User', UserSchema);
