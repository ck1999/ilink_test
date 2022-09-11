import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  async create(name: string, surname: string, groups) {
    let person = new Person()
    person.name = name
    person.surname = surname

    if (groups.length > 0){
      person.groups = []
      for(let i in groups){
        let group = await this.groupRepository.findOneBy({id: parseInt(groups[i])})
        if (group)
          person.groups.push(group)
      }
    }
    else {
      person.groups = []
    }

    person = await this.groupRepository.save(person);
    return person;
  }

  async findAll() {
    return await this.personRepository.find();
  }

  async findOne(id: number) {
    return await this.personRepository.findOneBy({
      id: id,
    });
  }

  async update(id: number, name: string, surname: string, groups) {
    const person = await this.personRepository.findOneBy({
      id: id
    })

    if (person){
      if (name){ person.name = name }
      if (surname){ person.surname = surname }

      if (groups.length > 0){
        person.groups = []
        for(let i in groups){
          let group = await this.groupRepository.findOneBy({id: parseInt(groups[i])})
          if (group)
            person.groups.push(group)
        }
      }

      const updatedPerson = await this.personRepository.save(person);
      return updatedPerson;
    }
    else {
      return id
    }

  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({
      id: id
    })

    if (!person){
      return id
    }

    await this.personRepository.delete(id)
    return id
  }
}
