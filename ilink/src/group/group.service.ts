import { Injectable } from '@nestjs/common';
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
    private readonly personRepository: Repository<Person>
  ) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    let group = new Group()
    group.name = createGroupInput.name
    group.persons = []

    if (createGroupInput.persons.length > 0){
      for(let i in createGroupInput.persons){
        let person = await this.personRepository.findOneBy({id: parseInt(createGroupInput.persons[i].id)})
        if (person)
          group.persons.push(person)
      }
    }

    return await this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository
    .createQueryBuilder('groups')
    .leftJoinAndSelect('groups.persons', 'persons')
    .getMany();
  }

  async findOne(id: number): Promise<Group> {
    return await this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()
  }

  async update(id: number, updateGroupInput: UpdateGroupInput): Promise<Group> {
    const group = await this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()

    if (group){

      if (updateGroupInput.name){
        group.name = updateGroupInput.name
      }

      if (updateGroupInput.persons.length > 0){
        group.persons = []
        for(let i in updateGroupInput.persons){
          let person = await this.personRepository.findOneBy({id: parseInt(updateGroupInput.persons[i].id)})
          if (person)
            group.persons.push(person)
        }
      }
      return await this.groupRepository.save(group)
    }

  }

  async remove(id: number): Promise<Group> {
    const group = await this.groupRepository.findOneBy({
      id: id
    })

    if (group){
      return await this.groupRepository.softRemove(group)
    }
    
  }
}
