// Web notifications utility
export const getPermissionStatus = async (): Promise<string> => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    return window.Notification.permission;
  }
  return 'denied';
};

export const requestPermission = async (): Promise<string> => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    return await window.Notification.requestPermission();
  }
  return 'denied';
};

export const sendNotification = (title: string, options?: NotificationOptions): void => {
  if (typeof window !== 'undefined' && 'Notification' in window && window.Notification.permission === 'granted') {
    new window.Notification(title, options);
  }
};

export const isSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};
