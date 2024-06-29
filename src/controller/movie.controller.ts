import Movie from 'src/model/movie.model';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import MovieService from 'src/service/movie.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('/movie')
@ApiTags('Movie')
@ApiBearerAuth()
export default class MovieController {
  constructor(private movieService: MovieService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() movie: Movie): Promise<Movie> {
    if (
      Object.values(movie).every(
        (value) => value !== null && value !== undefined,
      )
    ) {
      return await this.movieService.create(movie);
    }
    throw new BadRequestException('invalid parameters');
  }
  @Get()
  @UseGuards(AuthGuard)
  async find(): Promise<Movie[]> {
    return await this.movieService.find();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async get(@Param('id') id: number): Promise<Movie> {
    if (id) {
      return await this.movieService.get(Number(id));
    }
    throw new NotFoundException('movie not found');
  }
  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() movie: Movie): Promise<string> {
    if (
      id &&
      Object.values(movie).some(
        (value) => value !== null && value !== undefined,
      )
    ) {
      return await this.movieService.update(Number(id), movie);
    }
    throw new BadRequestException('inavlid parameters');
  }
  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    if (id) {
      const resp = await this.movieService.delete(Number(id));
      if (resp !== 'ok') {
        throw new InternalServerErrorException();
      }
      return;
    }
    throw new NotFoundException('movie not found');
  }
}
