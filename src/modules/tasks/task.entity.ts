import { IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    task!: string;

    @IsOptional()
    @Column({ default: true })
    isActive?: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    user!: User;
}
