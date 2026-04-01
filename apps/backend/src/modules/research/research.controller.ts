import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResearchService } from './research.service';

@Controller('research')
export class ResearchController {
  constructor(private researchService: ResearchService) {}

  @Get()
  findAll(
    @Query('lab') lab?: string,
    @Query('category') category?: string,
    @Query('search') search?: string
  ) {
    return this.researchService.findAll({ lab, category, search });
  }

  @Get('trending')
  getTrending() {
    return this.researchService.getTrending();
  }

  @Get('categories')
  getCategories() {
    return this.researchService.getCategories();
  }

  @Get('labs')
  getLabs() {
    return this.researchService.getLabs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchService.findOne(id);
  }
}