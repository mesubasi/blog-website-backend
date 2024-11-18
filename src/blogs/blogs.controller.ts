import { Body, Controller, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  createBlog(@Body() dto: BlogDto) {
    return this.blogService.createBlog(dto);
  }
}
