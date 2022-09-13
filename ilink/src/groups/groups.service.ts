import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../persons/entities/person.entity';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ) {}

  async create(name: string, persons) {
    let group = new Group()
    group.name = name
    group.persons = []

    if (persons.length > 0){
      for(let i in persons){
        let person = await this.personRepository.findOneBy({id: parseInt(persons[i])})
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

  async update(id: number, name: string, persons) {
    const group = await this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()

    if (name){
      group.name = name
    }

    if (group){

      if (persons.length > 0){
        group.persons = []
        for(let i in persons){
          let person = await this.personRepository.findOneBy({id: parseInt(persons[i])})
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
