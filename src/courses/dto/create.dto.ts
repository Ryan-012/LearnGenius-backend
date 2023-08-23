import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createCourseDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  description: string;
  authorId: string;

  @IsIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  @IsOptional()
  level: string;

  @IsOptional()
  @IsInt()
  price: number;
  numberOfLessons: number;
}
