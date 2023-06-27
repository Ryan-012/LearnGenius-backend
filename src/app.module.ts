import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthorizationMiddleware } from './authorization/authorization.middleware';
import { AuthorizationService } from './authorization/authorization.service';
import { CourseModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, CourseModule, ConfigModule.forRoot()],
  providers: [AuthorizationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('courses');
  }
}
