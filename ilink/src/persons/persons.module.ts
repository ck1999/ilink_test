import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Group } from '../groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), TypeOrmModule.forFeature([Group])],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
