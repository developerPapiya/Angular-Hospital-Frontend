import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warn' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(type: ToastType, title: string, message: string, duration = 3000): void {
    const id = ++this.counter;

    this.toasts.update(list => [...list, { id, type, title, message }]);

    // Auto remove after duration
    setTimeout(() => this.remove(id), duration);
  }

  success(title: string, message: string) {
    this.show('success', title, message);
  }

  error(title: string, message: string) {
    this.show('error', title, message);
  }

  warn(title: string, message: string) {
    this.show('warn', title, message);
  }

  info(title: string, message: string) {
    this.show('info', title, message);
  }

  remove(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}