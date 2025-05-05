import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';


@Module({
  imports: [
    ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: Number(process.env.DB_port),
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), EmployeesModule, ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule, AwsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
