import { ApiProperty } from '@nestjs/swagger';

export class BlogDto {
  @ApiProperty({ example: 'Title' })
  title: string;
  @ApiProperty({ example: 'Description' })
  content: string;
  userId?: string;
}
