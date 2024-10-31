import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
