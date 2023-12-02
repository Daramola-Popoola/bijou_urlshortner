import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import{PrismaService} from '../prisma/prisma.service';
import { HelperService } from '../helper/helper.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('UrlService', () => {
  let service: UrlService;
  let dbConnection: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[JwtModule, ConfigModule],
      providers: [UrlService, PrismaService, HelperService, JwtService, ConfigService],
    }).overrideProvider(PrismaService).useValue(dbConnection).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
