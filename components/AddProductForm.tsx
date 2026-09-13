"use client";

import { useActionState } from "react";
import { useEffect } from "react";
// Components
import productActions from "@/app/actions/productActions";
// Shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCat from "./SelectCat";

interface AddProductFormProps {
  onSuccess?: () => void;
  asCard?: boolean;
}

export default function AddProductForm({
  onSuccess,
  asCard = true,
}: AddProductFormProps = {}) {
  const [data, action, isPending] = useActionState(productActions, undefined);

  useEffect(() => {
    if (data?.success) {
      onSuccess?.();
    }
  }, [data?.success, onSuccess]);

  const formContent = (
    <form action={action} className="flex flex-col space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          defaultValue={data?.fieldsData?.title}
          name="title"
          type="text"
          placeholder="e.g. Mechanical Keyboard"
        />
        {data?.error?.title && (
          <p className="text-[12px] text-red-600">{data?.error?.title}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          defaultValue={data?.fieldsData?.price}
          name="price"
          type="text"
          placeholder="1000"
        />
        {data?.error?.price && (
          <p className="text-[12px] text-red-600">{data?.error?.price}</p>
        )}
      </div>
      <SelectCat result={data} />
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Adding Product..." : "Add Product"}
      </Button>
    </form>
  );

  if (!asCard) {
    return formContent;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}
