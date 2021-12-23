import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UsersEntity {
  
  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Mango', description: 'name'})
  @Column({ type: 'varchar'})
  name: string;
  
  @ApiProperty({example: 'Rusainer', description: 'surname'})
  @Column({ type: 'varchar', nullable: true})
  surname: string;

  @ApiProperty({example: 'mango@gmail.com', description: 'email'})
  @Column({ type: 'varchar'})
  email: string;

  @ApiProperty({example: 'This is my blog', description: 'description'})
  @Column({type: "varchar", length: 200, nullable: true})
  description: string;

  @ApiProperty({example: '1klk4mknf', description: 'password'})
  @Column({ type: 'varchar'})
  password: string;

  @ApiProperty({example: 'true', description: 'because of bullying'})
  @Column({ type: 'boolean', default: false})
  banned: boolean;

}
