import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './courses.service';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('test')
  test() {
    return 'this is a test';
  }

  @Post('create')
  async createCourse() {
    return await this.courseService.create();
  }
}
