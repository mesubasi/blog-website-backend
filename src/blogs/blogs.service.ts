import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogDto } from './dto/blog.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createBlog(dto: BlogDto, req: any) {
    try {
      const user = await this.userModel.findOne({ email: req.user.email });
      const newBlog = new this.blogModel({
        title: dto.title,
        content: dto.content,
        sharedBy: user.email,
        userId: user._id,
      });
      return await newBlog.save();
    } catch (err) {
      throw new HttpException(
        err.message || 'Failed to create post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateBlog(dto: BlogDto, id: string) {
    try {
      return await this.blogModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
    } catch (err) {
      throw new HttpException(
        err.message || 'Failed to update post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeBlog(id: string) {
    try {
      const deletePost = await this.blogModel.findByIdAndDelete(id);

      if (!deletePost)
        throw new HttpException(`Item ${id} Not Found!`, HttpStatus.NOT_FOUND);

      return deletePost;
    } catch (err) {
      throw new HttpException(
        err.message || 'Failed to remove post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllBlogs() {
    try {
      return await this.blogModel.find();
    } catch (err) {
      throw new HttpException(
        err.message || 'Failed to get all blog post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCurrentUsersBlog(req: any) {
    try {
      const user = await this.userModel.findOne({ email: req.user.email });
      return await this.blogModel.find({ userId: user._id });
    } catch (err) {
      throw new HttpException(
        err.message || 'Failed to get current user blogs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
