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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiOperation({ summary: 'List events' })
  // @ApiResponse({ status: 200, description: 'Success', type: Events, isArray: true })
  // @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({ summary: 'create User' })
  @ApiResponse({ status: 200, description: 'Success', type: User })
  @ApiBody({ type: User })
  @Post('/signin')
  async create(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const saltOrRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltOrRounds);
    const newuser = await this.userService.create(username, hashedpassword);
    return newuser;
  }

  @ApiOperation({ summary: 'get all user' })
  @Get('getall')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get('/:id')
  findbyid(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'update user by id' })
  @Put('/:id')
  update(@Param('id') id, @Body() username: User) {
    this.userService.update(id, username);
    return { msg: 'update successfull' };
  }

  @ApiOperation({ summary: 'delete user by id' })
  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.userService.remove(+id);
    return 'deleted';
  }
}
