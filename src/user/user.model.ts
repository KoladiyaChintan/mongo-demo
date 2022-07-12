// import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// export const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//     },
//     password: {
//       type: String,
//     },
//   },
//   { timestamps: true },
// );

// export interface User extends mongoose.Document {
//   id: string;
//   username: string;
//   password: string;
// }
export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  username: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  timestamps: true;
}

export const UserSchema = SchemaFactory.createForClass(User);
