import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Global()
@Module({
  imports: [JwtModule, ConfigModule.forRoot()],
  providers: [HelperService],
  exports: [HelperService]
})
export class HelperModule {}
