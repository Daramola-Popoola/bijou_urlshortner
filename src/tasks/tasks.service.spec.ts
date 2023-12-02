import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import {PrismaService} from '../prisma/prisma.service';
import { HelperService } from '../helper/helper.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


describe('TasksService', () => {
  let service: TasksService;
  let dbConnection: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[JwtModule, ConfigModule],
      providers: [TasksService, PrismaService, HelperService, JwtService, ConfigService],
    }).overrideProvider(PrismaService).useValue(dbConnection).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
