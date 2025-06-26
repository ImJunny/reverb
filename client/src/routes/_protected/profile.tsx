import { Button } from "@/components/ui/button";
import {
  currentUserProfileQueryOptions,
  userTopTracksQueryOptions,
} from "@/lib/api-options";
import { useAudio } from "@/lib/hooks/useAudio";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(userTopTracksQueryOptions);
  const { data: userData } = useQuery(currentUserProfileQueryOptions);

  const { setTrackId } = useAudio();
  if (!data) return <></>;

  const image = userData?.images?.[0]?.url;
  return (
    <div>
      <p>Hello from /profile!</p>
      <img
        src={image}
        alt="avatar"
        className="h-20 w-20 rounded-full object-cover"
      />
      {data.items.map((track, index) => (
        <Button key={index} onClick={() => setTrackId(track.id)} asChild>
          <p>{track.name}</p>
        </Button>
      ))}
    </div>
  );
}
