import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReplyMutationOptions } from "@/lib/api-options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Comment, Reply } from "shared/types";

export default function ReplyInput({
  comment,
  reply,
  isReplying,
  setIsReplying,
  setReplies,
}: {
  comment: Comment;
  reply?: Reply;
  isReplying: boolean;
  setIsReplying: (isReplying: boolean) => void;
  setReplies: Dispatch<SetStateAction<Reply[]>>;
}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();
  const { mutate: createReplyMutation } = useMutation(
    createReplyMutationOptions(),
  );

  const handleCreateReply = (content: string) => {
    createReplyMutation(
      {
        commentId: comment.id,
        content,
        tagUserId: reply?.user_id ?? undefined,
      },
      {
        onSuccess: (data: Reply) => {
          setInput("");
          setIsReplying(false);
          queryClient.invalidateQueries({
            queryKey: ["comment-replies"],
          });
          setReplies((prev) => [...prev, data]);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsReplying(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      setInput("");
    }
  };

  useEffect(() => {
    if (isReplying) {
      textareaRef.current?.focus();
    }
  }, [isReplying]);

  return (
    isReplying && (
      <div className="mt-2">
        <Textarea
          ref={textareaRef}
          label="Reply"
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
          <Button onClick={() => handleCreateReply(input)} className="h-6 px-2">
            Reply
          </Button>
        </div>
      </div>
    )
  );
}
