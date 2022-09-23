import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return { users: this.usersService.findAll() };
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
