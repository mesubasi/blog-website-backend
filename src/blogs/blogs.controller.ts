import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBlog(@Body() dto: BlogDto, @Request() req: any) {
    return this.blogService.createBlog(dto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateBlog(@Body() dto: BlogDto, @Param('id') id: string) {
    return this.blogService.updateBlog(dto, id);
  }
}
