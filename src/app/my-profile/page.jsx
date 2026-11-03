import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { User, Mail, Calendar } from 'lucide-react';

export const metadata = {
  title: 'My Profile | BookNook',
  description: 'View your BookNook account information.',
};

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login?callbackUrl=/my-profile');
  }

  const user = session.user;

  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="mt-2 text-sm text-muted">View your personal account information.</p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <div className="mb-8 flex flex-col items-center text-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'Profile'}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={40} />
              </div>
            )}

            <h2 className="mt-4 text-xl font-semibold text-foreground">
              {user.name || 'BookNook User'}
            </h2>
            <p className="mt-1 text-sm text-muted">BookNook Member</p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-xl bg-surface p-4">
              <User className="shrink-0 text-primary" size={20} />
              <div>
                <p className="text-xs text-muted">Full Name</p>
                <p className="font-medium text-foreground">{user.name || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-surface p-4">
              <Mail className="shrink-0 text-primary" size={20} />
              <div>
                <p className="text-xs text-muted">Email Address</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-surface p-4">
              <Calendar className="shrink-0 text-primary" size={20} />
              <div>
                <p className="text-xs text-muted">Member Since</p>
                <p className="font-medium text-foreground">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Not available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
