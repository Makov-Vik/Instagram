import { Entity, PrimaryGeneratedColumn, Column, Table } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity('hashtag')
export class HashtagEntity {
  
  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Travel', description: 'name of hashtag'})
  @Column({type: "varchar", length: 25,})
  name: string;

  @ApiProperty({example: 'Travel in Canada', description: 'description'})
  @Column({type: "varchar", length: 200, nullable: true})
  description: string;
  


}