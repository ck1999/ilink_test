import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../groups/entities/group.entity';
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

  async create(name: string, surname: string, groups: [number]): Promise<Person>  {
    let person = new Person()
    person.name = name
    person.surname = surname

    if (groups.length > 0){
      person.groups = []
      for(let i in groups){
        let group = await this.groupRepository.findOneBy({id: groups[i]})
        if (group)
          person.groups.push(group)
      }
    }
    else {
      person.groups = []
    }

    return await this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    return await this.personRepository.findOneBy({
      id: id,
    });
  }

  async update(id: number, name: string, surname: string, groups: [number]): Promise<Person> {
    const person = await this.personRepository.findOneBy({
      id: id
    })

    if (person){
      if (name){ person.name = name }
      if (surname){ person.surname = surname }

      if (groups.length > 0){
        person.groups = []
        for(let i in groups){
          let group = await this.groupRepository.findOneBy({id: groups[i]})
          if (group)
            person.groups.push(group)
        }
      }

      return await this.personRepository.save(person);
    }
    else {
      throw new HttpException('Not Found', 404)
    }

  }

  async remove(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({
      id: id
    })

    if (!person){
      throw new HttpException('Not Found', 404)
    }

    return await this.personRepository.softRemove(person)
  }
}
