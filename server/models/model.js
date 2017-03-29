var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  name: {type: String, required: true, minlength: 2},
  email: {type: String, required: true, minlength: 6},
  state: {type: String, minlength: 2},
  zipCode: {type: Number, required: true},
  password: {type: String, required: true},
  admin: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  memberships: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  following: [{type: Schema.Types.ObjectId, ref: 'Group'}]
}, {timestamps: true});

var GroupSchema = mongoose.Schema({
  name: {type: String, required: true, minlength: 2},
  description: {type: String, required: true, minlength: 1},
  admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  endorsements: [{type: Schema.Types.ObjectId, ref: 'Endorsement'}]
}, {timestamps: true});

var EndorsementSchema = mongoose.Schema({
  title: {type: String, required: true, minlength: 1},
  electionLevel: {type: String, required: true, minlength: 2},
  location: {type: String, minlength: 1},
  _groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  status: {type: String, required: true}
}, {timestamps: true});

// CHAT CHEMA
var ChatSchema = mongoose.Schema({
  user: {type:Schema.Types.ObjectId,ref:'User'},
  message: {type:String},
  _group: {type:Schema.Types.ObjectId,ref:'Group'},
},{timestamps: true});


mongoose.model('User', UserSchema);
mongoose.model('Group', GroupSchema);
mongoose.model('Endorsement', EndorsementSchema);
// assigning chat schema as a model
mongoose.model('Chat',ChatSchema);
GroupSchema.plugin(deepPopulate);
UserSchema.plugin(deepPopulate);
EndorsementSchema.plugin(deepPopulate);
