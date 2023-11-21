import { Controller, Get, Body, Req, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTaskDto } from './dto/get-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('urls')
  async getAllUrl(@Body()getTaskDto: GetTaskDto, @Req() req, @Res() res){
    return await this.tasksService.findAllUrl(getTaskDto, req, res);
  }
}
