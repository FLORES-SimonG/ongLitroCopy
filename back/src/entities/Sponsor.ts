import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Sponsors' })
export class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  logo: string;
}