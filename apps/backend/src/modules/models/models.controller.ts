import { Controller, Get, Param, Query } from '@nestjs/common';
import { ModelsService } from './models.service';

@Controller('models')
export class ModelsController {
  constructor(private modelsService: ModelsService) {}

  @Get()
  findAll(
    @Query('lab') lab?: string,
    @Query('category') category?: string,
    @Query('search') search?: string
  ) {
    return this.modelsService.findAll({ lab, category, search });
  }

  @Get('stats')
  getStats() {
    return this.modelsService.getStats();
  }

  @Get('labs')
  getLabs() {
    return this.modelsService.getLabs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelsService.findOne(id);
  }
}