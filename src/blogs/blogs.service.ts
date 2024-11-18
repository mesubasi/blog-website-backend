import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BlogsService {
  createBlog(dto: any) {
      throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
}
