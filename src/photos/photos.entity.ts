import { Entity, PrimaryGeneratedColumn, Column, Table } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity('photos')
export class PhotosEntity {
  
  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: '1', description: 'user id'})
  @Column({type: "int"})
  iduser: number;

  @ApiProperty({example: '', description: 'url photo'})
  @Column({type: "varchar"})
  url: string;

  @ApiProperty({example: 'It is my dog', description: 'description'})
  @Column({type: "varchar", length: 200, nullable: true})
  description: string;
}