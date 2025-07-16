import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Comment, Reply } from "shared/types";
import ReplyInput from "./reply-input";

export function ReplyEntry({
  comment,
  reply,
  setReplies,
}: {
  comment: Comment;
  reply: Reply;
  setReplies: Dispatch<SetStateAction<Reply[]>>;
}) {
  const [isReplying, setIsReplying] = useState(false);
  return (
    <div className="flex p-3 text-xs">
      <div className="flex w-full items-start space-x-3">
        <img
          src={
            reply?.user_image_url || "https://picsum.photos/seed/123/200/300"
          }
          alt="Avatar"
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="flex w-full flex-col">
          <div className="flex">
            <p>@{reply?.user_id}</p>
            <span className="text-muted-foreground">
              &nbsp;• {formatDistanceToNow(new Date(reply.created_at))} ago
            </span>
          </div>
          <div>
            {reply?.tag_user_id && (
              <span className="text-rose-500">@{reply?.tag_user_id}</span>
            )}
            <span className="text-sm">&nbsp;{reply?.text}</span>
          </div>

          <div className="text-muted-foreground mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart size={14} className="text-muted-foreground" />
              <span>1</span>
            </div>

            <button
              onClick={() => setIsReplying(true)}
              className="cursor-pointer"
            >
              <p>Reply</p>
            </button>
          </div>
          <ReplyInput
            comment={comment}
            setReplies={setReplies}
            reply={reply}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
        </div>
      </div>
    </div>
  );
}
