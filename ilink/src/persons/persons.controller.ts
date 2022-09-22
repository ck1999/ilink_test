import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { RMQService } from 'nestjs-rmq';
import { Person } from './entities/person.entity';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly personsService: PersonsService,
    private readonly rmqService: RMQService,
    ) {}

  @Post()
  create(@Body() req: {name: string, surname: string, groups: [number]}) {
    return this.rmqService.send('person.create', req) // .send<TYPES!>
    //return this.personsService.create(req.name, req.surname, req.groups);
  }

  @Get()
  findAll() {
    return this.rmqService.send('person.all', null)
    //return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rmqService.send<Number, Person>('person.get', id)
    //return this.personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: {name: string, surname: string, groups: [number]}) {
    return this.personsService.update(id, req.name, req.surname, req.groups);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rmqService.send<Number, Person>('person.remove', id)
    //return this.personsService.remove(id);
  }
}
