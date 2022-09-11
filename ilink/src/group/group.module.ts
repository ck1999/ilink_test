import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Person } from 'src/person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Person]),
  ],
  providers: [GroupResolver, GroupService],
  exports: [GroupService]
})
export class GroupModule {}
