import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentMutationOptions } from "@/lib/api-options";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommentInput({ postId }: { postId: string }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();
  const { mutate: createCommentMutation } = useMutation(
    createCommentMutationOptions(),
  );

  const handleCreateComment = (content: string) => {
    createCommentMutation(
      {
        postId: postId,
        content,
      },
      {
        onSuccess: () => {
          setInput("");
          setIsCommenting(false);
          queryClient.invalidateQueries({ queryKey: ["post-comments"] });
        },
      },
    );
  };

  const handleCancel = () => {
    setIsCommenting(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      setInput("");
    }
  };

  useEffect(() => {
    if (isCommenting) {
      textareaRef.current?.focus();
    }
  }, [isCommenting]);

  return (
    <div>
      {!isCommenting ? (
        <Input
          placeholder="Leave a comment..."
          onFocus={() => setIsCommenting(true)}
        />
      ) : (
        <div>
          <Textarea
            ref={textareaRef}
            label="Comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            scrollable={false}
          />
          <div className="mt-2 flex items-center justify-end gap-x-2">
            <Button
              className="rounded-none"
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleCreateComment(input)}
              className="h-6 px-2"
            >
              Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
