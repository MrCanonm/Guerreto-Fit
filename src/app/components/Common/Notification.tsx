// src/app/components/Common/Notification.tsx
import { toast } from 'sonner';

interface NotificationOptions {
  description?: string;
  duration?: number;
  className?: string;
  id?: string;
}

export const useNotification = () => {
  const showSuccess = (message: string, options?: NotificationOptions) => {
    toast.success(message, options);
  };

  const showError = (message: string, options?: NotificationOptions) => {
    toast.error(message, options);
  };

  const showWarning = (message: string, options?: NotificationOptions) => {
    toast.warning(message, options);
  };

  const showInfo = (message: string, options?: NotificationOptions) => {
    toast.info(message, options);
  };

  const showLoading = (message: string, options?: NotificationOptions) => {
    toast.loading(message, options);
  };

  const dismiss = (id:string) => {
    toast.dismiss(id);
  };

  return { showSuccess, showError, showWarning, showInfo, showLoading, dismiss };
};
