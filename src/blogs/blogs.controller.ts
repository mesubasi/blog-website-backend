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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Blogs') // Swagger kategorisi
@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while creating the blog.',
  })
  @Post()
  createBlog(@Body() dto: BlogDto, @Request() req: any) {
    return this.blogService.createBlog(dto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing blog' })
  @ApiParam({ name: 'id', description: 'Blog ID to update' })
  @ApiResponse({ status: 200, description: 'Blog updated successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized to update this blog.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while updating the blog.',
  })
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
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiParam({ name: 'id', description: 'Blog ID to delete' })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized to delete this blog.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while deleting the blog.',
  })
  @Delete(':id')
  removeBlog(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.removeBlog(id, dto);
  }

  @ApiOperation({ summary: 'Retrieve all blogs' })
  @ApiResponse({ status: 200, description: 'List of all blogs retrieved.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while retrieving blogs.',
  })
  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get blogs of the current user' })
  @ApiResponse({ status: 200, description: 'List of current user blogs.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while retrieving user blogs.',
  })
  @Get('my-blogs')
  getCurrentUsersBlog(@Request() req: any) {
    return this.blogService.getCurrentUsersBlog(req);
  }

  @ApiOperation({ summary: 'Retrieve a single blog by ID' })
  @ApiParam({ name: 'id', description: 'Blog ID to retrieve' })
  @ApiResponse({ status: 200, description: 'Blog retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while retrieving the blog.',
  })
  @Get(':id')
  getOneBlog(@Param('id') id: string) {
    return this.blogService.getOneBlog(id);
  }
}
