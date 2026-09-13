"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formSchema } from "@/types/product";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function productActions(
  previousData: unknown,
  formData: FormData,
) {
  const rawData = {
    title: formData.get("title")?.toString().trim(),
    price: formData.get("price"),
    category: formData.get("category"),
  };

  const result = formSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
      fieldsData: rawData,
    };
  }

  await prisma.product.create({
    data: {
      title: result.data.title,
      price: result.data.price,
      category: result.data.category,
    },
  });

  revalidatePath("/");

  return {
    success: true,
    error: null,
    fieldsData: {
      title: "",
      price: "",
      category: "",
    },
  };
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/");
}
