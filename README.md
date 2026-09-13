"Public Demo: Authentication is bypassed for review purposes. Data changes persist in real-time."

# StockPulse — Modern SaaS Admin Dashboard

A full-stack product and inventory management dashboard built with Next.js (App Router), focusing on server-first architecture, type safety, and seamless mutations.

## 🚀 Key Features

- **SaaS Dashboard Shell:** Responsive layout featuring a fixed/collapsible sidebar, metrics header, and polished UI using shadcn/ui and Tailwind CSS.
- **Server Actions & Mutations:** End-to-end CRUD operations handled directly on the server without custom API boilerplates.
- **Robust Validation:** Strict runtime schema validation using Zod with server-to-client field error handling.
- **Persistent Data Layer:** Cloud PostgreSQL database managed via Prisma ORM.
- **Instant UI Updates:** On-demand cache invalidation via Next.js `revalidatePath`.
- **Derived State:** Client-side category filtering and search queries evaluated without redundant effects.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL (Neon) & Prisma
- **Form & Data Validation:** Zod
- **Styling:** Tailwind CSS & shadcn/ui
- **Icons:** Lucide React

## 📦 Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/product-dashboard.git
   cd product-dashboard
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a \`.env\` file in the root directory:
   \`\`\`env
   DATABASE_URL="your-postgresql-connection-string"
   \`\`\`

4. Push the Prisma schema to your database:
   \`\`\`bash
   npx prisma db push
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
