import {
  createReplyMutationOptions,
  repliesQueryOptions,
} from "@/lib/api-options";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Comment } from "shared/types";
import CommentTextarea from "./comment-textarea";
import { formatTimeAgo } from "@/lib/scripts/formatTimeAgo";

export default function CommentEntry({
  comment,
  postId,
  type,
}: {
  comment: Comment;
  postId: string;
  type: "comment" | "reply";
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyCount, setReplyCount] = useState(comment.reply_count || 0);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [initialized, setInitialized] = useState(false);

  const { data: repliesData, refetch: fetchReplies } = useQuery({
    ...repliesQueryOptions(comment.id, cursor, 3),
    enabled: false,
  });

  const { mutate } = useMutation(createReplyMutationOptions());

  const handleSubmit = (content: string) => {
    if (!content.trim()) return;
    mutate(
      { commentId: comment.id, content },
      {
        onSuccess: () => {
          setIsReplying(false);
          fetchReplies();
        },
      },
    );
  };

  useEffect(() => {
    if (repliesData) {
      setReplies((prev) => [...prev, ...repliesData]);
      setReplyCount((prev) => prev - repliesData.length);
      setCursor(repliesData[repliesData.length - 1]?.created_at);
    }
  }, [repliesData, setReplies]);

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
              &nbsp;• {formatTimeAgo(comment.created_at)}
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
          <CommentTextarea
            show={isReplying}
            label="Reply"
            onSubmit={(content) => {
              handleSubmit(content);
            }}
            onCancel={() => setIsReplying(false)}
          />
          <div className="mt-2">
            {replies?.map((reply: Comment) => (
              <CommentEntry
                key={reply.id}
                comment={reply}
                postId={postId}
                type="reply"
              />
            ))}
          </div>

          <div className="ml-3 cursor-pointer self-start font-semibold">
            {type === "reply" ? null : replyCount > 0 && !initialized ? (
              <p
                onClick={() => {
                  fetchReplies();
                  setInitialized(true);
                }}
              >
                {replyCount} {replyCount > 1 ? "replies" : "reply"}
              </p>
            ) : replyCount > 0 ? (
              <p
                onClick={() => {
                  fetchReplies();
                  setInitialized(true);
                }}
              >
                {replyCount} more {replyCount > 1 ? "replies" : "reply"}
              </p>
            ) : (
              <p
                onClick={() => {
                  setReplies([]);
                  setCursor(undefined);
                  setReplyCount(comment.reply_count || 0);
                  setInitialized(false);
                }}
              >
                Hide all
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
