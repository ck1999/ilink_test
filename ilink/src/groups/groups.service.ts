import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/persons/entities/person.entity';
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

  create(name: string) {
    const group = this.groupRepository.save({name: name});
    return group;
  }

  findAll() {
    return this.groupRepository
    .createQueryBuilder('groups')
    .leftJoinAndSelect('groups.persons', 'persons')
    .getMany();
  }

  findOne(id: number) {
    return this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()
  }

  update(id: number, name: string, persons) {
    const group = this.groupRepository
    .createQueryBuilder('groups')
    .where("groups.id = :id", {id})
    .leftJoinAndSelect('groups.persons', 'persons')
    .getOne()

    if (group){
      let personsIds = []

      if (persons.length > 0){
        for(let i in persons){
          let person = this.personRepository.findOneBy({id: parseInt(persons[i])})
          if (!person){
            continue
          }
          personsIds.push(persons[i])
        } 
      
      }

      const updatedGroup = this.groupRepository.update({id: id}, {name: name, persons: personsIds})
      return updatedGroup
    }
    else {
      return
    }

  }

  remove(id: number) {
    const group = this.groupRepository.findOneBy({
      id: id
    })

    if (!group){
      return id
    }

    this.groupRepository.delete(id)
    return id
  }
}
