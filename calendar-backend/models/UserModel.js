import { Schema, model } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: { 
    type: String,
    require: true,
    unique: true,
  },
  password: { 
    type: String,
    require: true,
  },
});

export const userModel = model('User', UserSchema);
