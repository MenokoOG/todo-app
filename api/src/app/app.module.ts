import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts.module';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot(), // Ensures environment variables are loaded
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION_STRING'),
        // Removed useNewUrlParser and useUnifiedTopology as they are deprecated
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
