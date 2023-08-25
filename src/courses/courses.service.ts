import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCourseDTO } from './dto/create.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourse(id: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          lessons: true,
        },
      });
      if (course) return course;
      throw new NotFoundException('Course not founded');
    } catch (error) {
      throw error;
    }
  }

  async getAllCourses() {
    const courses = await this.prisma.course.findMany({
      include: {
        author: true,
        lessons: true,
      },
      orderBy: {},
    });

    return courses;
  }

  async create(data: createCourseDTO) {
    const { authorId, title, description, level, ...rest } = data;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: authorId,
      },
    });

    try {
      const course = await this.prisma.course.create({
        data: {
          title,
          description,
          authorId,
          level,
          ...rest,
        },
      });

      if (course) return course;
      throw new InternalServerErrorException('Failed to create course');
    } catch (error) {
      throw error;
    }
  }

  async editCourse(data: createCourseDTO, courseId: string) {
    await this.prisma.course.findUniqueOrThrow({
      where: {
        id: courseId,
      },
    });

    try {
      const courseUpdated = await this.prisma.course.update({
        where: {
          id: courseId,
        },
        data,
      });

      if (courseUpdated) return courseUpdated;
      throw new InternalServerErrorException('Failed to edit course');
    } catch (error) {
      throw error;
    }
  }

  async addCourseView(id: string) {
    const course = await this.prisma.course.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        views: course.views + 1,
      },
    });
  }

  async delete(id: string) {
    const course = await this.prisma.course.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await this.prisma.lesson.deleteMany({
      where: {
        courseId: course.id,
      },
    });

    return await this.prisma.course.delete({
      where: {
        id: course.id,
      },
      include: {
        lessons: true,
      },
    });
  }
}
