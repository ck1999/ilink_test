import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  create(name: string, surname: string) {
    const person = this.personRepository.save({name: name, surname: name});
    return person;
  }

  findAll() {
    return this.personRepository.find();
  }

  findOne(id: number) {
    return this.personRepository.findOneBy({
      id: id,
    });
  }

  update(id: number, name: string, surname: string) {
    const person = this.personRepository.findOneBy({
      id: id
    })

    if (person){
      const updatedPerson = this.personRepository.update({id: id}, {name: name, surname: surname});
      return updatedPerson;
    }
    else {
      return id
    }

  }

  remove(id: number) {
    const person = this.personRepository.findOneBy({
      id: id
    })

    if (!person){
      return id
    }

    this.personRepository.delete(id)
    return id
  }
}
