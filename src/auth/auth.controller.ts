import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/:id')
  registerManager(
    @Query('role') role: string,
    @Body() createUserDto: CreateUserDto,
    @Param('id') id: string,
  ) {
    if (role === 'manager') {
      return this.authService.registerManager(id, createUserDto);
    } else if (role === 'employee') {
      return this.authService.registerEmployee(id, createUserDto);
    }
    throw new BadRequestException('Rol Invalido');
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any,
  ) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  @Patch('/:id')
  updateUser(
    @Param('id') userEmail: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
