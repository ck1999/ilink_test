import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../group/entities/group.entity';
import { Repository } from 'typeorm';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  async create(createPersonInput: CreatePersonInput): Promise<Person> {
    let person = new Person()
    person.name = createPersonInput.name
    person.surname = createPersonInput.surname

    if (createPersonInput.groups.length > 0){
      person.groups = []
      for(let i in createPersonInput.groups){
        let group = await this.groupRepository.findOneBy({id: parseInt(createPersonInput.groups[i].id)})
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

  async update(id: number, updatePersonInput: UpdatePersonInput): Promise<Person> {
    const person = await this.personRepository.findOneBy({
      id: id
    })

    if (person){
      if (updatePersonInput.name){ person.name = updatePersonInput.name }
      if (updatePersonInput.surname){ person.surname = updatePersonInput.surname }

      if (updatePersonInput.groups.length > 0){
        person.groups = []
        for(let i in updatePersonInput.groups){
          let group = await this.groupRepository.findOneBy({id: parseInt(updatePersonInput.groups[i].id)})
          if (group)
            person.groups.push(group)
        }
      }

      return await this.personRepository.save(person);
    }

  }

  async remove(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({
      id: id
    })

    if (person){
      return await this.personRepository.softRemove(person)
    }
    
  }
}
