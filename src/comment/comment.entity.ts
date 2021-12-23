import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';


@Entity('comments')
export class CommentsEntity {
  
  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: '1', description: 'user id'})
  @Column({type: "int"})
  iduser: number;

  @ApiProperty({example: '1', description: 'photo id'})
  @Column({type: "int"})
  idphoto: number;

  @ApiProperty({example: 'It is my dog', description: 'comment'})
  @Column({type: "varchar", length: 200})
  comment: string;

}