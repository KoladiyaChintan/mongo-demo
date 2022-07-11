import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async create(username: string, password: string) {
    const user = new this.userModel({
      username,
      password,
    });
    await user.save();
    return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ id });
    return user;
  }

  async update(id: number, username: User) {
    return await this.userModel.findByIdAndUpdate(id, username);
  }

  async remove(id) {
    return await this.userModel.findByIdAndRemove(id);
  }
}
