import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import { PersonModule } from './person/person.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Person } from './person/entities/person.entity';
import { Group } from './group/entities/group.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      host: 'localhost',
      synchronize: false,
      entities: [Person, Group],
    }),
    GroupModule,
    PersonModule,
  ],
})
export class AppModule {}
