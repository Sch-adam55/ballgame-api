
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['team'] });
  }

  findOne(id: number): Promise<Player> {
    return this.playerRepository.findOne(id, { relations: ['team'] });
  }

  create(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  async update(id: number, player: Player): Promise<Player> {
    await this.playerRepository.update(id, player);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.playerRepository.delete(id);
  }
}
