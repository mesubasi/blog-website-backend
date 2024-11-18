import { Body, Controller, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  createBlog(@Body() dto) {
    return this.blogService.createBlog(dto);
  }
}
