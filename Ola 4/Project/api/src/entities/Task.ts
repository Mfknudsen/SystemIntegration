import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Task {


  @ObjectIdColumn() 
  id!: ObjectId ;

  @Column()
  text!: string;
  
  @Column()
  description!: string;

  @Column()
  deadline!: string | undefined | null;

  @Column()
  isCompleted!: boolean;

  @Column()
  category!: number;
}