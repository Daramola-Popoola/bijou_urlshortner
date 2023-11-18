import { Controller } from '@nestjs/common';
import { HelperService } from './helper.service';

@Controller('helper')
export class HelperController {
  constructor(private readonly helperService: HelperService) {}
}
