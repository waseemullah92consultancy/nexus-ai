import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IsArray, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser, CurrentUserData } from '../../common/decorators';

class CreateAgentDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(10)
  description!: string;

  @IsString()
  @MinLength(2)
  category!: string;

  @IsString()
  @MinLength(1)
  icon!: string;

  @IsString()
  @MinLength(2)
  defaultModel!: string;

  @IsString()
  @MinLength(10)
  systemPrompt!: string;

  @IsArray()
  @IsString({ each: true })
  features!: string[];

  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @IsOptional()
  @IsIn(['public', 'private'])
  visibility?: 'public' | 'private';
}

class UpdateAgentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  category?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  icon?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  defaultModel?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  systemPrompt?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsIn(['public', 'private'])
  visibility?: 'public' | 'private';
}

@Controller('agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Get()
  findAll(@Query('category') category?: string, @Query('search') search?: string) {
    return this.agentsService.findAll({ category, search });
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  findMine(@CurrentUser() user: CurrentUserData) {
    return this.agentsService.findMine(user.userId);
  }

  @Get('categories')
  getCategories() {
    return this.agentsService.getCategories();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateAgentDto, @CurrentUser() user: CurrentUserData) {
    return this.agentsService.create(dto, user.userId);
  }

  @Post('from-template/:id')
  @UseGuards(JwtAuthGuard)
  createFromTemplate(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.agentsService.createFromTemplate(id, user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAgentDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.agentsService.update(id, dto, user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.agentsService.remove(id, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }
}