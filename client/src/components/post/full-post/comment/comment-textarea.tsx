import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

type CommentInputProps = {
  show?: boolean;
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  label?: string;
} & Omit<HTMLAttributes<HTMLTextAreaElement>, "onSubmit">;

export default function CommentTextarea({
  show = true,
  onSubmit,
  onCancel,
  label = "Comment",
  className,
}: CommentInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className={className}>
      <Textarea
        ref={textareaRef}
        label={label}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        scrollable={false}
      />
      <div className="mt-2 flex items-center justify-end gap-x-2">
        <Button
          className="rounded-none"
          variant="ghost"
          onClick={() => onCancel?.()}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmit?.(input);
            setInput("");
          }}
          className="h-6 px-2"
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
