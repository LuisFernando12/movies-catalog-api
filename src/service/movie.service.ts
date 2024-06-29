import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Movie from 'src/model/movie.model';
import { Repository } from 'typeorm';

@Injectable()
export default class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}
  async create(movie: Movie) {
    try {
      const movieDB = await this.movieRepository.save(movie);
      return movieDB;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async find(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }
  async get(id: number): Promise<Movie> {
    try {
      return await this.movieRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async update(id: number, movie: Movie): Promise<string> {
    try {
      await this.movieRepository.update({ id: id }, movie);
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async delete(id: number): Promise<string> {
    try {
      await this.movieRepository.delete({ id: id });
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
