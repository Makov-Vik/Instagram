import { ApiProperty } from '@nestjs/swagger';

export class updataUserDto {

  @ApiProperty({example: 'Mangus', description: 'name'})
  readonly name: string

  @ApiProperty({example: 'Rusainer', description: 'surname'})
  readonly surname: string | undefined;

  @ApiProperty({example: 'Mangus@gmail.com', description: 'email'})
  readonly email: string

  @ApiProperty({example: 'jklj&k5@kn3', description: 'password'})
  readonly password: string

  @ApiProperty({example: 'This is my blog', description: 'description'})
  readonly description: string | undefined;

}