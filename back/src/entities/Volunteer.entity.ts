import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Event } from './Event.entity';
import { User } from './User.entity';

@Entity({ name: 'Volunteers' })
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @OneToOne(() => User, (user) => user.volunteerData)
  user: User;

  @Column({ type: 'varchar', nullable: false })
  availableDays: string[];

  @Column({ type: 'varchar', nullable: false })
  startHours: string;

  @Column({ type: 'varchar', nullable: false })
  endHours: string;

  @Column({ type: 'varchar', nullable: false })
  volunteerSince: Date;

  @ManyToMany(() => Event, (event) => event.volunteer)
  events: Event[];
}
