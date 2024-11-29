import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Create Successfully!' })
  @Post()
  createBlog(@Body() dto: BlogDto, @Request() req: any) {
    return this.blogService.createBlog(dto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  updateBlog(
    @Body() dto: BlogDto,
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.blogService.updateBlog(dto, id, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  removeBlog(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.removeBlog(id, dto);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('my-blogs')
  getCurrentUsersBlog(@Request() req: any) {
    return this.blogService.getCurrentUsersBlog(req);
  }

  @Get(':id')
  getOneBlog(@Param('id') id: string) {
    return this.blogService.getOneBlog(id);
  }
}
