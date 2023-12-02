import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const requestMock = {} as unknown as Request;
  
  const responseMock = {
    json: jest.fn((x) => x)
  } as unknown as Response;
  
  const mockAuthService = {
    signIn: jest.fn((dto, req, res) => {
      return {
        ...dto,
        req, res
      }
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).overrideProvider(AuthService).useValue(mockAuthService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  //this is the acceptedd shape of data for the controller
  
  const dto = {
    username: `dddev`,
    password: 'password@1',
    email:`example@mail.com`
  }
  describe('signIn', () => {
    it('logs in existing user', async () => {
      jest.spyOn(mockAuthService, 'signIn').mockReturnValue({msg: 'Hi!, dddev'});
      
      const result = await controller.signIn(dto, requestMock, responseMock);
      
      //assert 
      expect(mockAuthService.signIn).toHaveBeenCalled();
      expect(mockAuthService.signIn).toHaveBeenCalledWith(dto,requestMock, responseMock);
      
      expect(result).toEqual({msg: "Hi!, dddev"})
      
    })
  }) 
});
