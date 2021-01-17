import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { Neo4jModule, Neo4jConfig } from 'nest-neo4j';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TargetGroupModule } from './target-group/target-group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from "./templates/templates.module";
import { CampaignsModule } from "./campaigns/campaigns.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    Neo4jModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService): Neo4jConfig => ({
        scheme: configService.get('NEO4J_SCHEME'),
        host: configService.get('NEO4J_HOST'),
        port: configService.get('NEO4J_PORT'),
        username: configService.get('NEO4J_USERNAME'),
        password: configService.get('NEO4J_PASSWORD'),
        database: configService.get('NEO4J_DATABASE'),
      })
    }),
    TargetGroupModule,
    TemplatesModule,
    CampaignsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
  exports: []
})
export class AppModule {}
