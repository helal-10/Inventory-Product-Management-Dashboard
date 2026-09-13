import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/types/product";

type Cat = { label: string; value: string | null };

const categories: Cat[] = [
  { label: "Select Category", value: null },
  ...CATEGORIES.map((cat) => ({ label: cat, value: cat })),
];

interface SelectCatProps {
  result?: {
    success?: boolean;
    error?: {
      category?: string[];
      title?: string[];
      price?: string[];
    } | null;
    fieldsData?: Record<string, unknown> | null;
  } | null;
}

function SelectCat({ result }: SelectCatProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="category">Category</Label>
      <Select items={categories} name="category">
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {result?.error?.category && (
        <p className="text-[12px] text-red-600">{result.error.category}</p>
      )}
    </div>
  );
}

export default SelectCat;
