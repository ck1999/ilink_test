import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { Group } from '../group/entities/group.entity';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), TypeOrmModule.forFeature([Group])],
  providers: [PersonResolver, PersonService],
  exports: [PersonService]
})
export class PersonModule {}
