import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CourseController {
  // constructor() {}

  @Get('test')
  test() {
    return 'this is a test';
  }
}
