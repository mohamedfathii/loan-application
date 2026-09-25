import type { User } from '@/lib/api';

const roleBadge: Record<User['role'], string> = {
  applicant: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  reviewer: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  admin:
    'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
};

export function UsersTable({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p className="text-sm text-zinc-500">No users yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Email</th>
            <th className="px-3 py-2 font-medium">Phone</th>
            <th className="px-3 py-2 font-medium">Role</th>
            <th className="px-3 py-2 font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-3 py-2">{user.name}</td>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2 text-zinc-500">
                {user.phoneNumber ?? '—'}
              </td>
              <td className="px-3 py-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleBadge[user.role]}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-zinc-500">
                {new Date(user.createdAt).toLocaleString('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
