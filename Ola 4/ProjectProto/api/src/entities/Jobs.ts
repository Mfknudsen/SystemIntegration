import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Jobs {

  @ObjectIdColumn() 
  id!: ObjectId ;

  @Column()
  chemicalsAmount!: number;
  
  @Column()
  incoming!: boolean;
  
  @Column()
  warehouseNumber!: number;
  
}