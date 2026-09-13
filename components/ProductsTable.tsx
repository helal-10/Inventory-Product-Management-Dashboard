"use client";

import { useState, useTransition } from "react";
import { Search, Trash2, Eye, PackageOpen, Loader2 } from "lucide-react";

// Shadcn
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterCat from "@/components/FilterCat";
import AddProductModal from "@/components/AddProductModal";
import { deleteProduct } from "@/app/actions/productActions";
import type { Product } from "@/types/product";

function ProductsTable({ products }: { products: Product[] }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchValue.toLowerCase().trim());

    const matchesCategory =
      !selectCategory ||
      selectCategory === "All" ||
      product.category === selectCategory;

    return matchesSearch && matchesCategory;
  });

  function handleSelectCategory(value: string) {
    if (value != null) setSelectCategory(value);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      await deleteProduct(id);
      setDeletingId(null);
    });
  }

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold tracking-tight">
              Products Catalog
            </CardTitle>
            <Badge variant="secondary" className="font-semibold text-xs">
              {filteredProducts.length} items
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-1">
            Browse, search, and manage products and inventory levels
          </CardDescription>
        </div>

        <div className="flex items-center gap-2.5">
          <AddProductModal />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls Bar: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchValue}
              name="search-product"
              type="text"
              placeholder="Search products..."
              className="pl-8 text-sm"
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
          </div>
          <FilterCat handleSelectCategory={handleSelectCategory} />
        </div>

        {/* Products Data Table */}
        <div className="rounded-xl border border-border/80 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Price</TableHead>
                <TableHead className="font-semibold text-right pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <PackageOpen className="size-6 text-muted-foreground" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">
                        No products found
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Try adjusting your search terms or filter selection.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((p, index) => {
                  // Low stock for items priced < 50 or alternate for visual demonstration
                  const isLowStock = index % 3 === 2;

                  return (
                    <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                      {/* Title & SKU */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-sm">
                            {p.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono">
                            SKU-{p.id.slice(0, 6).toUpperCase()}
                          </span>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-medium text-xs px-2.5 py-0.5"
                        >
                          {p.category}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                            <span className="size-1.5 rounded-full bg-amber-500" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            In Stock
                          </span>
                        )}
                      </TableCell>

                      {/* Formatted Price */}
                      <TableCell className="text-right font-semibold text-foreground tabular-nums">
                        ${p.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>

                      {/* Actions: View & Delete */}
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                            title="View product details"
                            aria-label="View product"
                          >
                            <Eye className="size-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            disabled={isPending && deletingId === p.id}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete product"
                            aria-label="Delete product"
                          >
                            {isPending && deletingId === p.id ? (
                              <Loader2 className="size-4 animate-spin text-destructive" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductsTable;
