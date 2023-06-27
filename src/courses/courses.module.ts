import { Module } from '@nestjs/common';
import { CourseController } from './courses.controller';

@Module({
  providers: [],
  controllers: [CourseController],
})
export class CourseModule {}
