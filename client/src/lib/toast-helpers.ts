import { toast } from "@/hooks/use-toast";

export const showSuccess = (message: string) => {
  toast({
    title: message,
  });
};

export const showError = (message: string) => {
  toast({
    title: message,
    variant: "destructive",
  });
};

export const showLoading = (message: string) => {
  return toast({
    title: message,
  });
};

export const dismissToast = (id: string) => {
  // The toast hook handles dismissal via the returned object
};
