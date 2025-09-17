import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "general",
    honey: "" // honeypot
  });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string,string> = {};
    if (!form.name.trim()) newErrors.name = t('contact.error.name');
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = t('contact.error.email');
    if (form.message.trim().length < 20) newErrors.message = t('contact.error.message');
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
    <Layout>
  <div className="container mx-auto py-8 sm:py-12 px-4">
  <h1 className="text-4xl font-bold mb-10 bg-gradient-primary bg-clip-text text-transparent">{t('contact.title')}</h1>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            <Card className="p-6 space-y-5">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-1">{t('contact.address')}</h2>
                  <p className="text-sm text-muted-foreground">tunisia,Ariana </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-1">{t('contact.phone')}</h2>
                  <p className="text-sm text-muted-foreground">+216 57061807</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-1">{t('contact.email')}</h2>
                  <p className="text-sm text-muted-foreground">staazy@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-1">{t('contact.hours')}</h2>
                  <p className="text-sm text-muted-foreground">Mon - Fri: 9am - 6pm<br/>Sat: 10am - 4pm</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="font-semibold mb-2">{t('contact.quickHelpTitle')}</h2>
              <p className="text-sm text-muted-foreground">{t('contact.quickHelpText')}</p>
            </Card>
          </div>
          <div className="md:col-span-2">
            <div className="p-6 rounded-lg border bg-card">
              {/* Form will be upgraded in next steps */}
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                if (form.honey) return; // bot trap
                const v = validate();
                setErrors(v);
                if (Object.keys(v).length) return;
                try {
                  setSubmitting(true);
                  const resp = await fetch('https://formspree.io/f/xkgvlngd', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                      name: form.name,
                      email: form.email,
                      subject: form.subject,
                      message: form.message,
                      reason: form.reason,
                      formType: 'contact'
                    })
                  });
                  if (!resp.ok) throw new Error('Network');
                  toast({ title: t('contact.sentToastTitle'), description: t('contact.sentToastDesc') });
                  setForm({ name: "", email: "", subject: "", message: "", reason: "general", honey: "" });
                  setErrors({});
                } catch (err) {
                  toast({ title: 'Error', description: 'Failed to send. Please try again.', variant: 'destructive' });
                } finally {
                  setSubmitting(false);
                }
              }} noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="name">{t('contact.form.name')}</label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="email">{t('contact.form.email')}</label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="subject">{t('contact.form.subject')}</label>
                  <Input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder={t('contact.form.placeholder.subject')} />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="reason">{t('contact.form.reason')}</label>
                  <select id="reason" name="reason" value={form.reason} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-background">
                    <option value="general">{t('contact.reason.general')}</option>
                    <option value="order">{t('contact.reason.order')}</option>
                    <option value="product">{t('contact.reason.product')}</option>
                    <option value="feedback">{t('contact.reason.feedback')}</option>
                    <option value="support">{t('contact.reason.support')}</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="message">{t('contact.form.message')}</label>
                  <Textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} aria-invalid={!!errors.message} />
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                </div>
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="honey" value={form.honey} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                <div className="flex items-center gap-4">
                  <Button type="submit" className="px-6" disabled={submitting}>{submitting ? t('contact.sending') : t('contact.submit')}</Button>
                  <div aria-live="polite" className="text-sm text-muted-foreground min-h-[1.25rem]">
                    {submitting && t('contact.sendingStatus')}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
