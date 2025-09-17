import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Target, Star, Shield, HeartHandshake, Globe2, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const values = [
    { icon: <Star className="w-6 h-6 text-primary" />, title: t('about.value.quality.title'), desc: t('about.value.quality.desc') },
    { icon: <Shield className="w-6 h-6 text-primary" />, title: t('about.value.trust.title'), desc: t('about.value.trust.desc') },
    { icon: <HeartHandshake className="w-6 h-6 text-primary" />, title: t('about.value.community.title'), desc: t('about.value.community.desc') },
    { icon: <Globe2 className="w-6 h-6 text-primary" />, title: t('about.value.sustainability.title'), desc: t('about.value.sustainability.desc') },
  ];

  const milestones = [
    { year: "2021", title: t('about.milestonesTitle'), text: t('about.milestone.founded') },
    { year: "2022", title: '1K', text: t('about.milestone.1k') },
    { year: "2023", title: 'EXP', text: t('about.milestone.expansion') },
    { year: "2024", title: 'SUS', text: t('about.milestone.sustainability') },
  ];

  const team = [
    { name: "Alex Carter", role: "Founder & CEO" },
    { name: "Jamie Lee", role: "Head of Product" },
    { name: "Riley Chen", role: "Community Manager" },
  ];

  return (
    <Layout>
      {/* Hero */}
  <section className="container mx-auto pt-10 sm:pt-12 pb-12 sm:pb-16 text-center px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">{t('about.heroTitle')}</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">{t('about.heroText')}</p>
      </section>

      {/* Mission & Vision */}
  <section className="container mx-auto pb-14 sm:pb-20 grid gap-6 sm:gap-8 md:grid-cols-2 px-4">
        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-semibold">{t('about.missionTitle')}</h2>
          </div>
          <p className="text-muted-foreground">{t('about.missionText')}</p>
        </Card>
        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Flame className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-semibold">{t('about.visionTitle')}</h2>
          </div>
          <p className="text-muted-foreground">{t('about.visionText')}</p>
        </Card>
      </section>

      {/* Values */}
  <section className="container mx-auto pb-14 sm:pb-20 px-4">
  <h2 className="text-3xl font-bold mb-10 text-center">{t('about.valuesTitle')}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map(v => (
            <Card key={v.title} className="p-6 space-y-3">
              {v.icon}
              <h3 className="font-semibold text-lg">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
  <section className="container mx-auto pb-14 sm:pb-20 px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 text-center space-y-2">
            <Trophy className="w-8 h-8 text-primary mx-auto" />
            <p className="text-4xl font-extrabold">10K+</p>
            <p className="text-sm text-muted-foreground">Orders Shipped</p>
          </Card>
          <Card className="p-6 text-center space-y-2">
            <Users className="w-8 h-8 text-primary mx-auto" />
            <p className="text-4xl font-extrabold">4.9★</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </Card>
          <Card className="p-6 text-center space-y-2">
            <Shield className="w-8 h-8 text-primary mx-auto" />
            <p className="text-4xl font-extrabold">98%</p>
            <p className="text-sm text-muted-foreground">Satisfaction</p>
          </Card>
          <Card className="p-6 text-center space-y-2">
            <Globe2 className="w-8 h-8 text-primary mx-auto" />
            <p className="text-4xl font-extrabold">60%</p>
            <p className="text-sm text-muted-foreground">Eco Packaging</p>
          </Card>
        </div>
      </section>

      {/* Timeline */}
  <section className="container mx-auto pb-14 sm:pb-20 px-4">
  <h2 className="text-3xl font-bold mb-10 text-center">{t('about.milestonesTitle')}</h2>
        <div className="relative border-l pl-8 space-y-10 dark:border-neutral-800 border-neutral-200">
          {milestones.map(m => (
            <div key={m.year} className="relative">
              <span className="absolute -left-3 top-1.5 w-5 h-5 rounded-full bg-primary ring-4 ring-background" />
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {m.year} <span className="text-primary text-sm font-medium">{m.title}</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-prose">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto pb-20">
  <h2 className="text-3xl font-bold mb-10 text-center">{t('about.teamTitle')}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map(member => (
            <Card key={member.name} className="p-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary" />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
  <section className="container mx-auto pb-20 sm:pb-24 text-center px-4">
        <Card className="p-10 max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-background to-muted/30 backdrop-blur">
          <h2 className="text-3xl font-bold">{t('about.ctaTitle')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('about.ctaText')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link to="/products">{t('cta.shopProducts')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link to="/contact">{t('cta.contactUs')}</Link>
            </Button>
          </div>
        </Card>
      </section>
    </Layout>
  );
}
