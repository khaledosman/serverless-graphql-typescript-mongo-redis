import { Schema } from 'mongoose'
export const UserSchema = new Schema(
  {
    email: {
      type: String,
      // required: true,
      index: {
        sparse: true,
        unique: true
      },
      trim: true,
      unique: true,
      match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    firstName: String,
    lastName: String,
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
