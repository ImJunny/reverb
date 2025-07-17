import { TagInput } from "@/components/ui/tag-input";
import { tags } from "shared/types";

export default function CreatePostTagInput({
  value,
  onChange,
}: {
  value: { value: string; label: string }[];
  onChange: (tags: { value: string; label: string }[]) => void;
}) {
  return (
    <TagInput
      options={[...tags]}
      selected={value}
      onChange={onChange}
      placeholder="Add tags"
      label="Tags"
    />
  );
}
