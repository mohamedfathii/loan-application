import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column({
    unique: true,
    transformer: {
      to: (value?: string) => value?.trim().toLowerCase(),
      from: (value: string) => value,
    },
  })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  phoneNumber: string | null;

  @Column({ name: 'password_hash', select: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Applicant })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
