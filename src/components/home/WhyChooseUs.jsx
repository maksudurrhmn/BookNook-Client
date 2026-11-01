import { BookOpen, Search, BookmarkCheck, Users } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Easy Book Discovery',
    description: 'Explore a diverse collection and find books that match your interests.',
  },
  {
    icon: BookOpen,
    title: 'Explore New Stories',
    description: 'Discover new authors, exciting stories, and timeless classics.',
  },
  {
    icon: BookmarkCheck,
    title: 'Simple Borrowing',
    description: 'Borrow your favorite books and keep track of your reading journey.',
  },
  {
    icon: Users,
    title: 'Reader Friendly',
    description: 'Enjoy a simple and organized library experience designed for readers.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            The BookNook Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Why Choose BookNook?
          </h2>

          <p className="mt-4 leading-7 text-muted">
            Everything you need to discover, explore, and enjoy your next favorite book in one
            place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
