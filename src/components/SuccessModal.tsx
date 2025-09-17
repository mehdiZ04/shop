import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90vw] sm:w-full text-center p-5 sm:p-6">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
            {t('success.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {t('success.message')}
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {t('success.continue')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}