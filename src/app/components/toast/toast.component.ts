import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./toast.component.css'],
  template: `
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-80">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md"
          [ngClass]="getToastAnimationClass(toast)"
          [class]="getToastClass(toast)"
        >
          <div class="mt-0.5 shrink-0">
            @if (toast.type === 'success') {
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            @if (toast.type === 'error') {
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            @if (toast.type === 'warn') {
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
            @if (toast.type === 'info') {
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          </div>

          <!-- Text -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold">{{ toast.title }}</p>
            <p class="text-xs mt-0.5 opacity-90">{{ toast.message }}</p>
          </div>

          <!-- Close button -->
          <button
            (click)="removeToast(toast.id)"
            class="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  toastService = inject(ToastService);
  removingToastIds = new Set<number>();

  getToastClass(toast: ToastMessage): string {
    const classes: Record<string, string> = {
      success:
        'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
      error:
        'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
      warn: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
      info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
    };
    return classes[toast.type] ?? '';
  }

  getToastAnimationClass(toast: ToastMessage): string {
    const isRemoving = this.removingToastIds.has(toast.id);
    return isRemoving ? 'toast-exit' : 'toast-enter';
  }

  removeToast(toastId: number): void {
    this.removingToastIds.add(toastId);
    setTimeout(() => {
      this.toastService.remove(toastId);
      this.removingToastIds.delete(toastId);
    }, 300);
  }
}
