import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, Flame, MapPin, Plus, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import heroImg from "@/assets/hero-products.jpg";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/site/search-bar";
import { AdGrid } from "@/components/ads/ad-card";
import { EmptyState } from "@/components/site/empty-state";
import { CategoryIcon } from "@/lib/category-icons";
import { categoriesQuery, homeQuery } from "@/lib/queries";
import { POPULAR_DISTRICTS, districtName } from "@/lib/districts";
import type { AdListItem } from "@/lib/ads";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "বাজারবন্ধু — বাংলাদেশের অনলাইন কেনাবেচার বাজার" },
      { name: "description", content: "মোবাইল, ইলেকট্রনিক্স, গাড়ি, মোটরসাইকেল, প্রপার্টি, চাকরি — বাংলাদেশের ৬৪ জেলায় বিনামূল্যে বিজ্ঞাপন দিন ও কিনুন বাজারবন্ধুতে।" },
      { property: "og:title", content: "বাজারবন্ধু — বাংলাদেশের অনলাইন কেনাবেচার বাজার" },
      { property: "og:description", content: "৬৪ জেলা জুড়ে সহজে কিনুন, বেচুন। বিনামূল্যে বিজ্ঞাপন দিন বাজারবন্ধুতে।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(homeQuery()),
    ]);
  },
  component: HomePage,
});

const POPULAR_SEARCHES = ["iPhone", "Samsung", "বাইক", "ফ্ল্যাট ভাড়া", "ল্যাপটপ", "সোফা"];

function HomePage() {
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: home } = useSuspenseQuery(homeQuery());
  const active = categories.filter((c) => c.is_active);
  const hasAny = home.latest.length > 0;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-page grid items-center gap-10 py-10 md:grid-cols-[1.1fr_1fr] md:py-16 lg:py-20">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
              <Sparkles className="size-3.5" /> ৬৪ জেলায় সম্পূর্ণ বিনামূল্যে বিজ্ঞাপন
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              যা খুঁজছেন, পাবেন <span className="text-primary">বাজারবন্ধুতে</span>
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
              নতুন-পুরাতন মোবাইল, গাড়ি, বাইক, ফ্ল্যাট, চাকরি — হাজারো পণ্য ও সেবা এক জায়গায়। সরাসরি বিক্রেতার সাথে কথা বলুন।
            </p>
            <SearchBar variant="hero" />
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">জনপ্রিয়:</span>
              {POPULAR_SEARCHES.map((q) => (
                <Link key={q} to="/ads" search={{ q }} className="rounded-full border bg-background/80 px-3 py-1 text-xs font-medium transition hover:border-primary hover:text-primary">
                  {q}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-background shadow-elegant">
              <img src={heroImg} alt="মোবাইল, হেডফোন, হেলমেট, শাড়ি, চাবি, চেয়ার ও চালের বস্তা — বাজারবন্ধুতে সবকিছু" width={1536} height={1152} className="h-full w-full object-cover" />
            </div>
            <div className="animate-float absolute -left-6 bottom-10 flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-card">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><ShieldCheck className="size-5" /></span>
              <div className="text-sm">
                <p className="font-semibold">যাচাইকৃত বিজ্ঞাপন</p>
                <p className="text-xs text-muted-foreground">প্রতিটি বিজ্ঞাপন রিভিউ করা হয়</p>
              </div>
            </div>
            <div className="animate-float absolute -right-4 top-8 flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-card [animation-delay:1.5s]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-featured/30 text-featured-foreground"><Zap className="size-5" /></span>
              <div className="text-sm">
                <p className="font-semibold">২ মিনিটে পোস্ট</p>
                <p className="text-xs text-muted-foreground">ছবি তুলুন, দাম দিন, ব্যাস!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-10 md:py-14">
        <SectionHeading title="ক্যাটাগরি অনুযায়ী খুঁজুন" subtitle="আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি বেছে নিন" />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 lg:grid-cols-11">
          {active.map((c, i) => (
            <Link
              key={c.id}
              to="/ads"
              search={{ category: c.slug }}
              className="group flex animate-fade-up flex-col items-center gap-2 rounded-2xl border bg-card px-1 py-4 text-center card-lift"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground sm:size-14">
                <CategoryIcon name={c.icon} className="size-6 sm:size-7" />
              </span>
              <span className="text-[11px] font-semibold leading-tight sm:text-xs">{c.name_bn}</span>
            </Link>
          ))}
        </div>
      </section>

      {!hasAny && (
        <section className="container-page">
          <EmptyState
            title="এখনো কোনো বিজ্ঞাপন নেই"
            description="বাজারবন্ধুতে প্রথম বিজ্ঞাপনটি দিন — সম্পূর্ণ বিনামূল্যে।"
            action={
              <Button variant="hero" size="lg" asChild>
                <Link to="/post"><Plus /> বিজ্ঞাপন দিন</Link>
              </Button>
            }
          />
        </section>
      )}

      {home.featured.length > 0 && (
        <AdSection icon={<Star className="size-5 fill-current" />} iconClass="bg-featured/30 text-featured-foreground" title="ফিচার্ড বিজ্ঞাপন" subtitle="বাছাই করা সেরা অফার" ads={home.featured} />
      )}
      {hasAny && (
        <AdSection icon={<Zap className="size-5" />} title="সর্বশেষ বিজ্ঞাপন" subtitle="এইমাত্র যোগ হওয়া পণ্য" ads={home.latest} />
      )}

      {/* CTA */}
      <section className="container-page py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-deep px-6 py-10 text-primary-foreground sm:px-10">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary-glow/30 blur-2xl" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold sm:text-3xl">অপ্রয়োজনীয় জিনিস বিক্রি করে আয় করুন</h2>
              <p className="max-w-xl text-primary-foreground/80">ছবি তুলুন, দাম লিখুন, পোস্ট করুন। হাজারো ক্রেতা সরাসরি আপনাকে কল বা হোয়াটসঅ্যাপ করবে।</p>
              <ul className="flex flex-wrap gap-4 pt-2 text-sm text-primary-foreground/90">
                <li className="flex items-center gap-1"><BadgeCheck className="size-4" /> ১০০% ফ্রি</li>
                <li className="flex items-center gap-1"><BadgeCheck className="size-4" /> ১০টি পর্যন্ত ছবি</li>
                <li className="flex items-center gap-1"><BadgeCheck className="size-4" /> সরাসরি যোগাযোগ</li>
              </ul>
            </div>
            <Button size="xl" variant="secondary" asChild className="shrink-0">
              <Link to="/post"><Plus /> এখনই বিজ্ঞাপন দিন</Link>
            </Button>
          </div>
        </div>
      </section>

      {home.popular.length > 0 && (
        <AdSection icon={<Flame className="size-5" />} iconClass="bg-destructive/10 text-destructive" title="জনপ্রিয় পণ্য" subtitle="সবচেয়ে বেশি দেখা বিজ্ঞাপন" ads={home.popular} />
      )}

      {/* DISTRICTS */}
      <section className="container-page py-10">
        <SectionHeading title="জেলা অনুযায়ী খুঁজুন" subtitle="আপনার কাছাকাছি বিক্রেতা খুঁজে নিন" />
        <div className="flex flex-wrap gap-2">
          {POPULAR_DISTRICTS.map((slug) => (
            <Link key={slug} to="/ads" search={{ district: slug }} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:bg-secondary hover:text-primary">
              <MapPin className="size-4 text-primary" /> {districtName(slug)}
            </Link>
          ))}
          <Link to="/ads" className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-primary hover:underline">
            সব ৬৪ জেলা <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function AdSection({ title, subtitle, ads, icon, iconClass = "bg-secondary text-primary" }: { title: string; subtitle: string; ads: AdListItem[]; icon: React.ReactNode; iconClass?: string }) {
  return (
    <section className="container-page py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}>{icon}</span>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <Link to="/ads" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
          সব দেখুন <ArrowRight className="size-4" />
        </Link>
      </div>
      <AdGrid ads={ads} />
    </section>
  );
}
