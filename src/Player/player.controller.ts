
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}


  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Player> {
    return this.playerService.findOne(id);
  }

  
  @Post()
  create(@Body() player: Player): Promise<Player> {
    return this.playerService.create(player);
  }

  
  @Patch(':id')
  update(@Param('id') id: number, @Body() player: Player): Promise<Player> {
    return this.playerService.update(id, player);
  }

  
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.playerService.remove(id);
  }
}
