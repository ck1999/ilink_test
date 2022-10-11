import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../person/entities/person.entity';
import { Repository } from 'typeorm';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    try {
      const group = new Group();
      group.name = createGroupInput.name;
      group.persons = [];

      if (createGroupInput.persons){
        if (createGroupInput.persons.length > 0) {
          for (const i in createGroupInput.persons) {
            const person = await this.personRepository.findOneBy({
              id: parseInt(createGroupInput.persons[i].id),
            });
            if (person) group.persons.push(person);
          }
        }
      }

      return await this.groupRepository.save(group);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll(): Promise<Group[]> {
    try {
      return await this.groupRepository
        .createQueryBuilder('groups')
        .leftJoinAndSelect('groups.persons', 'persons')
        .getMany();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number): Promise<Group> {
    try {
      return await this.groupRepository
        .createQueryBuilder('groups')
        .where('groups.id = :id', { id })
        .leftJoinAndSelect('groups.persons', 'persons')
        .getOne();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updateGroupInput: UpdateGroupInput): Promise<Group> {
    try {
      const group = await this.groupRepository
        .createQueryBuilder('groups')
        .where('groups.id = :id', { id })
        .leftJoinAndSelect('groups.persons', 'persons')
        .getOne();

      if (group) {
        if (updateGroupInput.name) {
          group.name = updateGroupInput.name;
        }

        if (updateGroupInput.persons){
          if (updateGroupInput.persons.length > 0) {
            group.persons = [];
            for (const i in updateGroupInput.persons) {
              const person = await this.personRepository.findOneBy({
                id: parseInt(updateGroupInput.persons[i].id),
              });
              if (person) group.persons.push(person);
            }
          }
        }

        return await this.groupRepository.save(group);
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number): Promise<Group> {
    try {
      const group = await this.groupRepository.findOneBy({
        id: id,
      });

      if (group) {
        return await this.groupRepository.softRemove(group);
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
