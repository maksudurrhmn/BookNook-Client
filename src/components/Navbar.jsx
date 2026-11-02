'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';

const publicLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Books', href: '/books' },
];

const privateLinks = [
  { name: 'Add Book', href: '/add-book' },
  { name: 'My Books', href: '/my-book' },
  { name: 'My Borrows', href: '/my-borrows' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    router.push('/');
    router.refresh();
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const renderLink = (link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={closeMenus}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        pathname === link.href ? 'text-primary' : 'text-foreground/70'
      }`}
    >
      {link.name}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Book<span className="text-primary">Nook</span>
          <span className="ml-1 text-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {publicLinks.map(renderLink)}

          {!isPending && user && privateLinks.map(renderLink)}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg transition-colors hover:bg-surface-secondary"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          )}

          {/* Authentication */}
          <div className="hidden items-center gap-3 sm:flex">
            {isPending ? null : user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full border border-border p-1 pr-3 hover:bg-surface-secondary"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}

                  <span className="max-w-24 truncate text-sm font-medium">
                    {user.name || 'Account'}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-48 rounded-xl border border-border bg-background p-2 shadow-lg">
                    <Link
                      href="/profile"
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-secondary"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-surface-secondary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-primary">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xl md:hidden"
          >
            {mobileMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="container mx-auto flex flex-col gap-4">
            {publicLinks.map(renderLink)}

            {!isPending && user && privateLinks.map(renderLink)}

            {!isPending && !user && (
              <div className="flex gap-4 border-t border-border pt-4">
                <Link href="/login" onClick={closeMenus}>
                  Login
                </Link>
                <Link href="/register" onClick={closeMenus}>
                  Register
                </Link>
              </div>
            )}

            {!isPending && user && (
              <>
                <Link href="/profile" onClick={closeMenus}>
                  My Profile
                </Link>
                <button onClick={handleLogout} className="text-left text-red-500">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
