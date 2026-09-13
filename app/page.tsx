import { getProducts } from "@/app/actions/productActions";
import ProductsTable from "@/components/ProductsTable";
import KPIStats from "@/components/KpiCard";

export default async function Home() {
  const products = await getProducts();

  const totalProducts = products.length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price, 0);
  const activeCategoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <main className="p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {/* Dashboard Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time stock valuation, category distribution, and catalog health.
          </p>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <KPIStats
        totalProducts={totalProducts}
        totalInventoryValue={totalInventoryValue}
        activeCategoriesCount={activeCategoriesCount}
      />

      {/* Products Catalog Table with Modal Trigger */}
      <ProductsTable products={products} />
    </main>
  );
}
