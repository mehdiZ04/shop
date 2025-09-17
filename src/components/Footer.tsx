import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container py-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full border hover:bg-accent transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 rounded-full border hover:bg-accent transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="p-2 rounded-full border hover:bg-accent transition-colors"
          >
            {/* Inline TikTok icon */}
            <svg viewBox="0 0 256 256" className="w-5 h-5" aria-hidden="true">
              <path fill="currentColor" d="M208.3 92.1a83 83 0 0 1-40.6-40.6V48h-30.5v104.7a28.6 28.6 0 1 1-28.6-28.6a28.2 28.2 0 0 1 6.6.8V92.4a60.1 60.1 0 1 0 53.9 59.9V105a112.1 112.1 0 0 0 40.6 7.6V92.1Z"/>
            </svg>
          </a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Stazzy</p>
      </div>
    </footer>
  );
}
