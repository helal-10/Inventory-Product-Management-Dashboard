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
interface FilterCatProps {
  handleSelectCategory: (value: string) => void;
}
export default function FilterCat({ handleSelectCategory }: FilterCatProps) {
  return (
    <Select
      items={categories}
      name="category"
      onValueChange={(value) => {
        if (value) {
          handleSelectCategory(value as string);
        }
      }}
    >
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Category" />
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
  );
}
