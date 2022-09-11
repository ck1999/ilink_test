import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
            synchronize: true,
            entities: [
                Person,
                Group
            ]
        }),
        PersonsModule,
        GroupsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}