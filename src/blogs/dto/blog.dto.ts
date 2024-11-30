import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlogDto {
  @ApiProperty({ example: 'Title' })
  title: string;
  @ApiProperty({ example: 'Description' })
  content: string;
  @ApiPropertyOptional({
    example: '64e90fcf5e5732a3d1c0b123',
    description: 'The user ID of the blog owner (automatically set).',
  })
  userId?: string;
}
