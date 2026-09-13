import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, DollarSign, Layers, TrendingUp, Sparkles } from "lucide-react";

export interface KPIStatsProps {
  totalProducts: number;
  totalInventoryValue: number;
  activeCategoriesCount: number;
}

export default function KPIStats({
  totalProducts,
  totalInventoryValue,
  activeCategoriesCount,
}: KPIStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Products */}
      <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-blue-500/30 transition-all duration-200">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Products
          </p>
          <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Package className="size-4.5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">{totalProducts}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1.5">
            <TrendingUp className="size-3.5" />
            <span>+12% vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Inventory Value */}
      <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-emerald-500/30 transition-all duration-200">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Value
          </p>
          <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="size-4.5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">
            ${totalInventoryValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1.5">
            <TrendingUp className="size-3.5" />
            <span>+8.4% vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Categories */}
      <Card className="border-border/80 shadow-xs hover:shadow-md hover:border-violet-500/30 transition-all duration-200">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <div className="size-9 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Layers className="size-4.5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold tracking-tight">{activeCategoriesCount}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1.5">
            <Sparkles className="size-3.5 text-violet-500" />
            <span>Active across catalog</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
