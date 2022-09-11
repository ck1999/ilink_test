import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() req: {name: string, surname: string, groups}) {
    return this.personsService.create(req.name, req.surname, req.groups);
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: {name: string, surname: string, groups}) {
    return this.personsService.update(id, req.name, req.surname, req.groups);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personsService.remove(id);
  }
}
