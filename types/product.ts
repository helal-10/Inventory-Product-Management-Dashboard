import { z } from "zod";

export const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Furniture",
  "Sports",
  "Health",
  "Games",
] as const;

export const categories = CATEGORIES;

export type Category = (typeof CATEGORIES)[number];

export const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must include at least 3 letters" }),
  price: z.coerce
    .number({ message: "Only numbers acceptable" })
    .gt(0, { message: "Price must be greater than 0" }),
  category: z.enum(CATEGORIES, { message: "Please select a valid category" }),
});

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  createdAt?: Date;
};
