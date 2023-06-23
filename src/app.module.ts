import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthorizationMiddleware } from './authorization/authorization.middleware';
import { AuthorizationService } from './authorization/authorization.service';

@Module({
  imports: [AuthModule],
  providers: [AuthorizationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('test');
  }
}
