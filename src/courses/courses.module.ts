import { Module } from '@nestjs/common';
import { CourseController } from './courses.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseService } from './courses.service';

@Module({
  providers: [CourseService, PrismaService],
  controllers: [CourseController],
})
export class CourseModule {}
