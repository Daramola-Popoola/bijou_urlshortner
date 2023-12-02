import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import {HelperService} from '../helper/helper.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
describe('AuthService', () => {
  let service: AuthService;
  let dbConnection: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      providers: [AuthService, PrismaService, HelperService, JwtService, ConfigService],
    }).overrideProvider(PrismaService).useValue(dbConnection).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
