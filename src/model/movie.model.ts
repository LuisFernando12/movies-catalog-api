import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  title: string;
  @ApiProperty()
  @Column()
  director: string;
  @ApiProperty()
  @Column()
  year: number;
  @ApiProperty()
  @Column()
  gender: string;
  @ApiProperty()
  @Column()
  duration: number;
  @ApiProperty()
  @Column()
  parentalRating: string;
  @ApiProperty()
  @Column('text')
  sinopse: string;
  @ApiProperty()
  @Column('simple-array')
  mainCast: string[];
  @ApiProperty()
  @Column('decimal')
  rating: number;
  @ApiProperty()
  @Column()
  language: string;
  @ApiProperty()
  @Column()
  country: string;
}
