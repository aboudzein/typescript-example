import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Example {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'int', nullable: true, width: 4 })
  birthYear: number;

  @Column({ type: 'int', nullable: true })
  professionality: number;

}
