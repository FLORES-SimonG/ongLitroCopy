import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/User.entity';
import { UserDto } from 'src/dtos/User.dto';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { UpdateResult } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: ' Obtener todos los usuarios',
    description: 'Esta ruta devuelve todos los usuarios registrados',
  })
  @UseInterceptors(RemoveDataSensitive)
  getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<User[]> {
    return this.usersService.getAllUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({
    summary: ' Obtener un usuario por id',
    description:
      'Esta ruta devuelve un usuario registrado, por un id enviado por parametro',
  })
  @UseInterceptors(RemoveDataSensitive)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario por id',
    description:
      'Esta ruta actualiza un usuario, por un id enviado por parametro y datos nuevos, de tipo UserDto enviados por body',
  })
  @UseInterceptors(RemoveDataSensitive)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<UserDto>,
  ): Promise<UpdateResult> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario por id',
    description:
      'Esta ruta elimina un usuario, por un id enviado por parametro',
  })
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  //ruta creada para pruebas(asi no toco lo de valen), eliminar
  @Post()
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }
}
