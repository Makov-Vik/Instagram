import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {

  @ApiProperty({example: 'Mangus', description: 'name'})
  readonly name: string

  @ApiProperty({example: 'Mangus@gmail.com', description: 'email'})
  readonly email: string

  @ApiProperty({example: 'jklj&k5@kn3', description: 'password'})
  readonly password: string
}