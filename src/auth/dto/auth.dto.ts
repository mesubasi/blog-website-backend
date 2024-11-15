import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MinLength } from 'class-validator';

export class AuthDTO {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail({}, { message: 'Enter a valid e-mail address.' })
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(8, { message: 'Password must have a minimum of 8 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'The password must contain at least one upper case letter, one lower case letter, one number and one special character.',
    },
  )
  password: string;
}
