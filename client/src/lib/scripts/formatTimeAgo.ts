import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (createdAt: string | Date) => {
  return formatDistanceToNow(new Date(createdAt), {
    includeSeconds: false,
    addSuffix: true,
  })
    .replace(/(\d+)\s*minutes?/, "$1 min")
    .replace(/(\d+)\s*hours?/, "$1 hr")
    .replace(/(\d+)\s*days?/, "$1 d")
    .replace(/(\d+)\s*months?/, "$1 mo")
    .replace(/(\d+)\s*years?/, "$1 y")
    .replace(/(\d+)\s*seconds?/, "$1 s")
    .replace("about ", "");
};
