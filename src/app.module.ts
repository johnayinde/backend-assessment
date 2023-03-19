import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from 'src/config/typeorm.config';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    MediaModule,
  ],
})
export class AppModule {}
