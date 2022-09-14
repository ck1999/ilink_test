import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() req: {name: string, persons: [number]}) {
    return this.groupsService.create(req.name, req.persons);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: {name: string, persons: [number]}) {
    return this.groupsService.update(id, req.name, req.persons);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupsService.remove(id);
  }
}
