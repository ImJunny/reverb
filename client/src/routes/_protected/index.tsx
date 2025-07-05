import BackgroundWrapper from "@/components/page/background-wrapper";
import { createFileRoute } from "@tanstack/react-router";
import RecentlyViewedCard from "@/components/page/recenty-viewed-card";
import GeneralPostCard from "@/components/post/GeneralPostCard";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

const posts = [
  {
    id: 3,
    username: "alexjohnson",
    timeAgo: "3hr ago",
    title: "Rate my playlist!",
    playlist_id: "0Ep7iMClqrHS7ax3fpPFVI",
    tags: ["Discussion", "Pop"],
  },
  {
    id: 4,
    username: "robertbrown",
    timeAgo: "5hr ago",
    title: "What is your go-to song for dancing?",
    content:
      "I can't pick between Rock With You by Michael Jackson and Uptown Funk by Mark Ronson. What would yours be?",
    tags: ["Discussion", "General"],
  },
  {
    id: 2,
    username: "janedoe",
    timeAgo: "2hr ago",
    title: "I need some suggestions for my new playlist!",
    playlist_id: "2Z5Oa4vMA7O8zjGOYBwwae",
    tags: ["Help", "Rnb", "Pop"],
  },
];

function RouteComponent() {
  return (
    <BackgroundWrapper
      className="p-3"
      type="gradient"
      options={{ resetColor: true }}
    >
      <div className="flex w-full max-w-2xl flex-col space-y-2">
        {posts.map((post) => (
          <GeneralPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="sticky top-3 ml-3 hidden w-72 flex-col space-y-3 self-start md:flex">
        <RecentlyViewedCard />
      </div>
    </BackgroundWrapper>
  );
}
