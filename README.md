#  Hospital Management Frontend

A modern, high-performance, and visually stunning Hospital Management System frontend built using **Angular v20** and **Tailwind CSS v4**. The system features role-based access control, reactive state management using **Angular Signals**, real-time search, custom alerts, dynamic theme support, and automated OPD slip generation.

---

## ✨ Key Features

- **🔐 Role-Based Access Control (RBAC):**
  - **Admin:** Complete access to the **Dashboard** metrics, **Patient Registration**, and **Appointment Booking**.
  - **Staff / Nurse:** Restricted access. Can register patients and book appointments, but cannot access admin dashboards.
  - Route guards (`authGuard`) and interceptors (`authInterceptor`) secure private routes and inject JWT bearer tokens automatically.
- **🎨 Premium Dark & Light UI/UX:**
  - Modern, responsive, and sleek interface utilizing Tailwind CSS v4.
  - Custom dark theme active by default, switchable via a persistent theme service.
- **📈 Real-Time Dashboard (Admin Only):**
  - Visual summary cards displaying total patients, doctors, and appointments loaded dynamically from the backend services.
- **📝 Patient Registration:**
  - Standardized form with real-time validation (custom regex for Indian phone numbers).
  - Duplicate phone check: If a patient is already registered, displays a quick navigation prompt to jump straight to booking an appointment for them.
- **📅 Interactive Appointment Booking:**
  - Debounced real-time patient search by name or phone (prevents unnecessary API load).
  - Integrated OPD slip generator: Automatically fetches the PDF receipt blob and opens it in a new tab upon successful booking.
- **🔔 Signal-driven Toast Notification System:**
  - Smooth animation cards (success, error, warn, info) stacking on the top-right corner.

---

## 🛠️ Tech Stack & Key Technologies

- **Framework:** [Angular v20](https://angular.dev/) (Standalone Components, Signals, Computed, Effects, CanActivateFn guards)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **State Management:** Angular Signals & RxJS Subjects
- **Build Tool:** Angular CLI v20.3.24
- **Testing:** Karma & Jasmine

---

## 📂 Project Structure

```
hospital-frontend/
├── src/
│   ├── app/
│   │   ├── components/            # Reusable standalone UI components
│   │   │   ├── navbar/            # Role-aware navigation header
│   │   │   ├── profile-dropdown/  # User profile quick actions
│   │   │   └── toast/             # Alert notifications system
│   │   ├── core/                  # Core logic, services, and routing utilities
│   │   │   ├── guards/            # Navigation guard (auth.guard.ts)
│   │   │   ├── interceptors/      # HTTP bearer token interceptor (auth.interceptor.ts)
│   │   │   └── services/          # HTTP & state services (Auth, Patient, Theme, etc.)
│   │   ├── interfaces/            # TypeScript models & API envelopes
│   │   ├── pages/                 # Standalone view components (routed pages)
│   │   │   ├── book-appointment/  # Patient lookup & appointment booking form
│   │   │   ├── dashboard/         # Hospital statistics summary panels
│   │   │   ├── login/             # Portal authorization portal
│   │   │   └── register-patient/  # Patient registration form
│   │   ├── app.config.ts          # Application providers configuration
│   │   ├── app.routes.ts          # Angular routing definitions
│   │   ├── app.ts                 # Main component logic
│   │   └── app.html               # Shell template
│   ├── environments/              # Environment-specific variables
│   ├── styles.css                 # Global CSS & Tailwind imports
│   └── main.ts                    # Application bootstrap entry point
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) along with the [Angular CLI](https://angular.dev/tools/cli).

### 🔧 Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hospital-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify/Update Environment Config:**
   Open `src/environments/environment.ts` and set the correct backend server API URL:
   ```typescript
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:5000/api/v1' // Point to your backend API
     // Note: Default configuration connects to http://localhost:5000
   };
   ```

4. **Start the local development server:**
   ```bash
   npm start
   # or
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser.

---

## 🧪 Commands

- **Development Server:** `ng serve` (runs the app locally)
- **Production Build:** `ng build` (generates build artifacts inside `dist/`)
- **Unit Tests:** `ng test` (executes unit tests using Karma)


 Documentation last updated on: May 21, 2026 by Papiya Roy 
