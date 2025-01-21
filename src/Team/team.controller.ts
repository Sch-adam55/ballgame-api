
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  
  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

 
  @Get(':id/players')
  getTeamWithPlayers(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id); 
  }

 
  @Post(':teamId/addPlayer/:playerId')
  async addPlayerToTeam(@Param('teamId') teamId: number, @Param('playerId') playerId: number) {
    const team = await this.teamService.findOne(teamId);
    const player = await this.playerService.findOne(playerId);

    if (!team || !player) {
      throw new Error('Team or Player not found');
    }

    team.players.push(player);
    return this.teamService.update(teamId, team);
  }

  
  @Post()
  create(@Body() team: Team): Promise<Team> {
    return this.teamService.create(team);
  }

  
  @Patch(':id')
  update(@Param('id') id: number, @Body() team: Team): Promise<Team> {
    return this.teamService.update(id, team);
  }

 
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.teamService.remove(id);
  }
}
