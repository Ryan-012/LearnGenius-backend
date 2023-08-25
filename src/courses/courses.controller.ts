import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './courses.service';
import { createCourseDTO } from './dto/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('get-course/:courseId')
  async getCourse(@Param('courseId') courseId: string) {
    return await this.courseService.getCourse(courseId);
  }

  @Get('get-all-courses')
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Post('create')
  async createCourse(@Body() data: createCourseDTO) {
    return await this.courseService.create(data);
  }

  @Put('edit/:courseId')
  async editCourse(
    @Body() data: createCourseDTO,
    @Param('courseId') courseId: string,
  ) {
    return await this.courseService.editCourse(data, courseId);
  }

  @Put('add-course-view/:courseId')
  async addCourseView(@Param('courseId') courseId: string) {
    return await this.courseService.addCourseView(courseId);
  }
  @Delete('delete/:courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return await this.courseService.delete(courseId);
  }
}
