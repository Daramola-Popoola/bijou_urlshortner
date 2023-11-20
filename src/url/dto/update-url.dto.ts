import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlPartialDto } from './create-url.dto';

export class UpdateUrlDto extends PartialType(CreateUrlPartialDto) {}
