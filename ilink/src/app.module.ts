import { Module } from '@nestjs/common';
import { PersonsModule } from './persons/persons.module';
import { GroupsModule } from './groups/groups.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from './persons/entities/person.entity';
import { Group } from './groups/entities/group.entity';
import { RMQModule } from 'nestjs-rmq';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'test',
            host: 'localhost',
            synchronize: true,
            entities: [
                Person,
                Group
            ]
        }),
        RMQModule.forRoot({
            exchangeName: 'test',
            connections: [
                {
                    login: 'root',
                    password: 'root',
                    host: 'localhost'
                }
            ],
            queueName: 'test-queue'
        }),
        PersonsModule,
        GroupsModule,
    ]
})
export class AppModule {}