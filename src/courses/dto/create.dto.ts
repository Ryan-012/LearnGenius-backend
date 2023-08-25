import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createCourseDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsIn(['Iniciante', 'Intermediário', 'Avançado'])
  @IsOptional()
  level: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  numberOfLessons: number;
}
