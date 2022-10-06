import { HttpException, Injectable } from '@nestjs/common';
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
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createPersonInput: CreatePersonInput): Promise<Person> {
    try {
      const person = new Person();
      person.name = createPersonInput.name;
      person.surname = createPersonInput.surname;

      if (createPersonInput.groups.length > 0) {
        person.groups = [];
        for (const i in createPersonInput.groups) {
          const group = await this.groupRepository.findOneBy({
            id: parseInt(createPersonInput.groups[i].id),
          });
          if (group) person.groups.push(group);
        }
      } else {
        person.groups = [];
      }

      return await this.personRepository.save(person);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll(): Promise<Person[]> {
    try {
      return await this.personRepository.find();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number): Promise<Person> {
    try {
      return await this.personRepository.findOneBy({
        id: id,
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(
    id: number,
    updatePersonInput: UpdatePersonInput,
  ): Promise<Person> {
    try {
      const person = await this.personRepository.findOneBy({
        id: id,
      });

      if (person) {
        if (updatePersonInput.name) {
          person.name = updatePersonInput.name;
        }
        if (updatePersonInput.surname) {
          person.surname = updatePersonInput.surname;
        }

        if (updatePersonInput.groups.length > 0) {
          person.groups = [];
          for (const i in updatePersonInput.groups) {
            const group = await this.groupRepository.findOneBy({
              id: parseInt(updatePersonInput.groups[i].id),
            });
            if (group) person.groups.push(group);
          }
        }

        return await this.personRepository.save(person);
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number): Promise<Person> {
    try {
      const person = await this.personRepository.findOneBy({
        id: id,
      });

      if (person) {
        return await this.personRepository.softRemove(person);
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
