import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';


@Entity('filter')
export class FilterEntity {
  
  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: '1', description: 'user id'})
  @Column({type: "int"})
  iduser: number;

  @ApiProperty({example: '1', description: 'photo id'})
  @Column({type: "int"})
  idphoto: number;

  @ApiProperty({example: 'gradient', description: 'filter photo'})
  @Column({type: "simple-array"})
  filter: string[];

}