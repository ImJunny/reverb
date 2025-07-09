import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (createdAt: string | Date) => {
  return formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    includeSeconds: false,
  })
    .replace(/(\d+)\s*minutes?/, "$1m")
    .replace(/(\d+)\s*hours?/, "$1h")
    .replace(/(\d+)\s*days?/, "$1d")
    .replace(/(\d+)\s*months?/, "$1mo")
    .replace(/(\d+)\s*years?/, "$1y")
    .replace(/(\d+)\s*seconds?/, "$1s");
};
