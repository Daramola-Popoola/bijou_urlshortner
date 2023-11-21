import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { UrlModule } from './url/url.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, AuthModule, HelperModule, UrlModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
