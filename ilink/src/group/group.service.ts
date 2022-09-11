import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
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

  async create(createGroupInput: CreateGroupInput) {
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

    group = await this.groupRepository.save(group);
    return group;
  }

  async findAll() {
    return await this.groupRepository
    .createQueryBuilder('groups')
    .leftJoinAndSelect('groups.persons', 'persons')
    .getMany();
  }

  async findOne(id: number) {
    return await this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()
  }

  async update(id: number, updateGroupInput: UpdateGroupInput) {
    const group = await this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()

    if (updateGroupInput.name){
      group.name = updateGroupInput.name
    }

    if (group){

      if (updateGroupInput.persons.length > 0){
        group.persons = []
        for(let i in updateGroupInput.persons){
          let person = await this.personRepository.findOneBy({id: parseInt(updateGroupInput.persons[i].id)})
          if (person)
            group.persons.push(person)
        }
      }
      const updatedGroup = await this.groupRepository.save(group)
      return updatedGroup
    }
    else {
      return id
    }

  }

  async remove(id: number) {
    const group = await this.groupRepository.findOneBy({
      id: id
    })

    if (!group){
      return id
    }

    await this.groupRepository.remove(group)
    return id
  }
}
