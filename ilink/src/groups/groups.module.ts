import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../persons/entities/person.entity';
import { Group } from './entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {}
