import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Warehouses {

  @ObjectIdColumn() 
  id!: ObjectId ;
  
  @Column()
  currentStorage!: number;

  @Column()
  maximumStorage!: number;

  @Column()
  warehouseNumber!: number;
  
}