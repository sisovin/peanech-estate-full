# Peanech Estate MVP

A full-stack, responsive real estate platform, Peanech Estate leverages modern web technologies, AI-driven features, and a polished user experience. This README outlines the MVP implementation phases for a scalable, future-ready web application.

---

## 🏗️ Step 1: Core Layout & Structure

- **Topbar**
  - Displays contact information and social media icons for quick access.
- **Header**
  - Features the logo, main navigation, dark mode toggle, and authentication modal trigger.
- **Hero Section**
  - Futuristic visual design using animated gradients for a memorable first impression.
- **Responsive Design**
  - Built with Tailwind CSS, employing a mobile-first strategy for seamless usage across devices and screen sizes.

---

## 🔧 Step 2: Build Core Functional Sections

- **Feature Highlights**
  - Showcase AI-powered property search, real-time market analytics, and mobile-first UX.
- **Tech Stack Display**
  - Visually list major technologies (e.g., PHP 8+, Tailwind CSS, React, Framer Motion).
- **Properties Section**
  - Display featured property listings with integrated booking functionality.
- **Agents Section**
  - Present agent profiles, including bios and contact forms for inquiries.
- **Marketing Section**
  - Newsletter signup with robust email validation to engage users.
- **Pricing Plans**
  - Clear, three-tier subscription plans, each with prominent call-to-action buttons.

---

## 🌀 Step 3: Add Interactive Experience

- **Dark Mode Toggle**
  - Smooth theme switching with `localStorage` persistence for user preference.
- **Smooth Transitions**
  - Page and component animations powered by Framer Motion.
- **Mobile Navigation**
  - Collapsible menus and optimized navigation for small screens.

---

## 🔐 Step 4: Implement Authentication & User Roles

- **User Roles & Access Control**
  - Four roles: Visitor, Agent, Admin, Super Admin.
  - Route access is restricted based on assigned role.
- **Login/Register Modal**
  - Modal forms with input validation and dynamic role assignment.
- **Demo Accounts**
  - Pre-filled sample credentials for quick testing and demonstration.

---

## 🖥️ Step 5: Admin Dashboard for Data Entry

- **Role-Based Access**
  - Only Admins and Super Admins may enter the backend dashboard.
- **Data Entry Modules**
  - Modular forms for managing:
    - Property listings
    - Agent information
    - Subscriptions
    - Marketing content
- **CRUD Operations**
  - Secure Create, Read, Update, Delete operations via API endpoints.
- **Audit & Logs (Optional)**
  - System tracks changes and user activity for improved oversight.

---

## 🎨 Step 6: Polish Design System

- **Styling Themes**
  - Gradients, glow effects, and futuristic typography for modern appeal.
- **UI Consistency**
  - Clean card layouts, uniform spacing, and a professional color palette.
- **Interactive States**
  - Responsive hover animations, transitions, and visual feedback for all interactive elements.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** PHP 8+ (and/or Node.js if applicable)
- **Authentication:** JWT/OAuth with role-based access control
- **Database:** MySQL / PostgreSQL
- **Deployment:** Vercel, Netlify, or similar

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sisovin/peanech-estate-full.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in credentials.
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Access the app**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

Feel free to open issues, suggest features, or submit pull requests. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

**Peanech Estate** — Modern real estate, reimagined with AI and responsive design.
