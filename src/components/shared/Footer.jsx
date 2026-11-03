import Link from 'next/link';
import { Mail, MapPin, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <BookOpen className="text-primary" size={25} />
              <span>
                Book<span className="text-primary">Nook</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Discover your next favorite book, explore new stories, and enjoy reading with
              BookNook.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground">Contact Us</h3>

            <div className="mt-4 space-y-3 text-sm text-muted">
              <p className="flex items-center gap-2">
                <Mail size={17} />
                support@booknook.com
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={17} />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground">Follow Us</h3>

            <div className="mt-4 flex gap-5 text-sm text-muted">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Facebook
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          © 2026 BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
