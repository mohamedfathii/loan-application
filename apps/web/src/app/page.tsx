import { connection } from 'next/server';
import { CreateUserForm } from '@/components/create-user-form';
import { UsersTable } from '@/components/users-table';
import { listUsers, type User } from '@/lib/api';

export default async function Home() {
  await connection();

  let users: User[] = [];
  let loadError: string | null = null;
  try {
    users = await listUsers();
    users.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    loadError = "Couldn't reach the API. Is it running on port 3000?";
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-16 md:grid-cols-[20rem_1fr]">
      <section>
        <h1 className="mb-6 text-2xl font-semibold">Create user</h1>
        <CreateUserForm />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Users{' '}
          {!loadError && (
            <span className="text-zinc-400">({users.length})</span>
          )}
        </h2>
        {loadError ? (
          <p
            role="alert"
            className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            {loadError}
          </p>
        ) : (
          <UsersTable users={users} />
        )}
      </section>
    </main>
  );
}
