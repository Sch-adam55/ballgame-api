
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { Player } from '../player/player.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['players'] });
  }

  findOne(id: number): Promise<Team> {
    return this.teamRepository.findOne(id, { relations: ['players'] });
  }

  create(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }

  async update(id: number, team: Team): Promise<Team> {
    await this.teamRepository.update(id, team);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
