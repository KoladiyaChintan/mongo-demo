import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  async create(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const saltOrRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltOrRounds);
    const newuser = await this.userService.create(username, hashedpassword);
    return {
      msg: 'successfull',
      userid: newuser.id,
      username: newuser.username,
    };
  }

  @Get('getall')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findbyid(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id, @Body() username: User) {
    this.userService.update(id, username);
    return { msg: 'update successfull' };
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.userService.remove(+id);
    return 'deleted';
  }
}
