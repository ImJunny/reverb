import {
  createReplyMutationOptions,
  repliesQueryOptions,
} from "@/lib/api-options";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Comment } from "shared/types";
import CommentTextarea from "./comment-textarea";
import { formatTimeAgo } from "@/lib/scripts/formatTimeAgo";
import ReplyEntry from "./reply-entry";

export default function CommentEntry({
  comment,
  parentComment,
}: {
  comment: Comment;
  parentComment: Comment;
}) {
  const queryClient = useQueryClient();
  const [replying, setReplying] = useState(false);
  const [replyCount, setReplyCount] = useState(comment.reply_count || 0);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [initialized, setInitialized] = useState(false);

  const { data: repliesData, refetch: fetchReplies } = useQuery({
    ...repliesQueryOptions(comment.id, cursor, 4),
    enabled: false,
  });

  const { mutate } = useMutation(createReplyMutationOptions());

  const handleSubmit = (content: string) => {
    if (!content.trim()) return;
    mutate(
      {
        commentId: parentComment!.id,
        content,
        taggedUserId:
          comment.user_id === parentComment.user_id ? null : comment.user_id,
      },
      {
        onSuccess: (data: Comment) => {
          setReplying(false);
          setReplies((prev) => [data, ...prev]);
          queryClient.invalidateQueries({
            queryKey: ["comment-replies", parentComment!.id],
          });
        },
      },
    );
  };

  useEffect(() => {
    if (repliesData) {
      setReplies((prev) => [...prev, ...repliesData]);
      setCursor(repliesData[repliesData.length - 1]?.created_at);
    }
  }, [repliesData]);

  useEffect(() => {
    setReplyCount(comment.reply_count! - replies.length);
  }, [replies.length, comment.reply_count]);

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
          <p className="text-sm">
            <span className="text-rose-500">{comment.tagged_user_id}</span>{" "}
            {comment.text}
          </p>
          <div className="text-muted-foreground mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart size={14} className="text-muted-foreground" />
              <span>1</span>
            </div>

            <button
              onClick={() => setReplying(true)}
              className="cursor-pointer"
            >
              <p>Reply</p>
            </button>
          </div>
          <CommentTextarea
            show={replying}
            label="Reply"
            onSubmit={(content) => {
              handleSubmit(content);
            }}
            onCancel={() => setReplying(false)}
            className="mt-3"
          />
          <div className="mt-2">
            {replies?.map((reply: Comment) => (
              <ReplyEntry
                key={reply.id}
                comment={reply}
                parentComment={parentComment}
                setReplies={setReplies}
              />
            ))}
          </div>

          <div className="ml-3 cursor-pointer self-start font-semibold">
            {replyCount > 0 && !initialized ? (
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
