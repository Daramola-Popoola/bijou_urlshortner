import { OmitType } from '@nestjs/mapped-types';
import {TaskEntity} from '../entities/task.entity';

export class GetTaskDto extends OmitType(TaskEntity, ['userId', 'createdAt', 'updatedAt']) {}

interface ITaskShape{
    id?: boolean;
    title: boolean;
    actualUrl: boolean;
    shortUrl: boolean;
    
}
export const taskShape:ITaskShape = {
    id: true,
    title: true,
    actualUrl: true,
    shortUrl: true
}
