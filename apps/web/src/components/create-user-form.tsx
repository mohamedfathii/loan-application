'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { createUser, type User } from '@/lib/api';
import { USER_ROLES, type UserRole } from '@/lib/roles';

const inputClass =
  'w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900';

export function CreateUserForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<User | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const phoneNumber = String(data.get('phoneNumber') ?? '').trim();

    setPending(true);
    setError(null);
    setCreated(null);
    try {
      const user = await createUser({
        name: String(data.get('name')),
        email: String(data.get('email')),
        password: String(data.get('password')),
        ...(phoneNumber && { phoneNumber }),
        role: data.get('role') as UserRole,
      });
      setCreated(user);
      form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Name
        <input name="name" required className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Email
        <input name="email" type="email" required className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Password
        <input
          name="password"
          type="password"
          minLength={8}
          required
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Phone number{' '}
        <span className="font-normal text-zinc-500">
          (optional, e.g. +971501234567)
        </span>
        <input name="phoneNumber" type="tel" className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Role
        <select name="role" defaultValue="applicant" className={inputClass}>
          {USER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role[0].toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {pending ? 'Creating…' : 'Create user'}
      </button>

      {error && (
        <p
          role="alert"
          className="whitespace-pre-line rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}

      {created && (
        <p className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-300">
          Created <strong>{created.name}</strong> ({created.email}) as{' '}
          <strong>{created.role}</strong>.
        </p>
      )}
    </form>
  );
}
