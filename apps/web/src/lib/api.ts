import type { UserRole } from './roles';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: UserRole;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: UserRole;
  createdAt: string;
}

export async function createUser(body: CreateUserRequest): Promise<User> {
  const res = await fetch(`${API_URL}/users/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join('\n')
      : (data.message ?? `Request failed (${res.status})`);
    throw new Error(message);
  }
  return data;
}

export async function listUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users/list`);
  if (!res.ok) {
    throw new Error(`Failed to load users (${res.status})`);
  }
  return res.json();
}
