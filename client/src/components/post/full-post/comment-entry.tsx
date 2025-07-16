import { Skeleton } from "@/components/ui/skeleton";
import { commentRepliesQueryOptions } from "@/lib/api-options";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Comment, Reply } from "shared/types";
import ReplyInput from "./reply-input";
import { ReplyEntry } from "./reply-entry";

export default function CommentEntry({ comment }: { comment: Comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyCount, setReplyCount] = useState(comment.reply_count || 0);
  const [cursor, setCursor] = useState<string | undefined>(
    new Date().toISOString(),
  );
  const [replies, setReplies] = useState<Reply[]>([]);

  const {
    data: repliesData,
    refetch: refetchReplies,
    isFetching,
  } = useQuery({
    ...commentRepliesQueryOptions(comment.id, cursor, 2),
    enabled: false,
  });

  useEffect(() => {
    if (repliesData && repliesData.length > 0) {
      setReplies((prev) => [...[...repliesData].reverse(), ...prev]);
      setCursor(repliesData[repliesData.length - 1]?.created_at);
      setReplyCount((prev) => prev - repliesData.length);
    }
  }, [repliesData]);

  return (
    <div className="flex p-3 text-xs">
      <div className="flex w-full items-start space-x-3">
        <img
          src={
            comment?.user_image_url || "https://picsum.photos/seed/123/200/300"
          }
          alt="Avatar"
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="flex w-full flex-col">
          <div className="flex">
            <p>@{comment?.user_id}</p>
            <span className="text-muted-foreground">
              &nbsp;• {formatDistanceToNow(new Date(comment.created_at))} ago
            </span>
          </div>
          <p className="text-sm">{comment?.text}</p>
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
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
          {replyCount > 0 && (
            <button
              className="mt-5 cursor-pointer self-start font-semibold"
              onClick={() => {
                refetchReplies();
              }}
            >
              <div>
                {replyCount} {replyCount == 1 ? "Reply" : "Replies"}
              </div>
            </button>
          )}

          {isFetching && <Skeleton className="h-14 w-full" />}
          <div className="mt-2">
            {replies?.map((reply) => (
              <ReplyEntry
                key={reply.id}
                setReplies={setReplies}
                comment={comment}
                reply={reply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
