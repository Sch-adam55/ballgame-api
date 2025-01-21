
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { Player } from './player/player.entity';
import { Team } from './team/team.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Player, Team],
      synchronize: true,
    }),
    PlayerModule,
    TeamModule,
  ],
})
export class AppModule {}


