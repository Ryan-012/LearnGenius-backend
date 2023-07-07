import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthorizationMiddleware } from './authorization/authorization.middleware';
import { AuthorizationService } from './authorization/authorization.service';
import { CourseModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    CourseModule,
    AuthorizationModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AuthorizationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(...['courses', 'authorization']);
  }
}
