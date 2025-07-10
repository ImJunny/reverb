import Card from "../ui/card";
import { Separator } from "../ui/separator";

const recentPosts = [
  {
    id: 1,
    username: "@emily_carruso1",
    timeAgo: "1hr ago",
    title: "Posted a new playlist, looking for your suggestions!",
    likes: 12,
    comments: 5,
    suggestions: 0,
  },
  {
    id: 2,
    username: "@michaelbrown",
    timeAgo: "2hr ago",
    title: "Shared my playlist—any feedback or song ideas?",
    likes: 8,
    comments: 2,
    suggestions: 1,
  },
  {
    id: 3,
    username: "@sarah_lee2",
    timeAgo: "3hr ago",
    title: "Just posted my playlist, suggest some tracks!",
    likes: 5,
    comments: 1,
    suggestions: 0,
  },
  {
    id: 4,
    username: "@davidkim",
    timeAgo: "4hr ago",
    title: "Looking for suggestions on my latest playlist!",
    likes: 20,
    comments: 10,
    suggestions: 3,
  },
  {
    id: 5,
    username: "@olivia_martin3",
    timeAgo: "5hr ago",
    title: "Posted a playlist—drop your favorite songs!",
    likes: 15,
    comments: 7,
    suggestions: 2,
  },
];

export default function RecentlyViewedCard() {
  return (
    <Card className="flex flex-col rounded-xs p-0 text-xs">
      <div className="mb-1 flex items-center justify-between px-3 pt-3">
        <h1>Recently viewed</h1>
        <p className="text-muted-foreground">Clear</p>
      </div>
      <div className="text-muted-foreground flex flex-col space-y-2">
        {recentPosts.map((post, idx) => (
          <div key={post.id}>
            <div className="px-3">
              <div className="flex flex-col space-y-2 py-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://picsum.photos/200/300?random=${post.id}`}
                    alt="profile"
                    className="h-6 w-6 shrink-0 rounded-full object-cover"
                  />
                  <p className="text-foreground">{post.username}</p>
                  <p className="text-muted-foreground">• {post.timeAgo}</p>
                </div>
                <p>{post.title}</p>
                <div className="flex space-x-2">
                  <p>{post.likes} likes</p>
                  <p>{post.comments} comments</p>
                  <p>{post.suggestions} suggestions</p>
                </div>
              </div>
            </div>
            {idx !== recentPosts.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </Card>
  );
}
