import { Module } from '@nestjs/common';
import { PersonsModule } from './persons/persons.module';
import { GroupsModule } from './groups/groups.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from './persons/entities/person.entity';
import { Group } from './groups/entities/group.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'test',
            host: 'localhost',
            synchronize: false,
            entities: [
                Person,
                Group
            ]
        }),
        PersonsModule,
        GroupsModule,
    ]
})
export class AppModule {}