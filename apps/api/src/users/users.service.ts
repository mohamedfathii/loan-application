import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserRole } from './user-role.enum.js';
import { User } from './user.entity.js';

const UNIQUE_VIOLATION = '23505';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      phoneNumber: dto.phoneNumber ?? null,
      passwordHash: await argon2.hash(dto.password),
      role: dto.role ?? UserRole.Applicant,
    });

    try {
      const saved = await this.usersRepository.save(user);
      const { passwordHash: _passwordHash, ...safeUser } = saved;
      return safeUser as User;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === UNIQUE_VIOLATION
      ) {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  listUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
