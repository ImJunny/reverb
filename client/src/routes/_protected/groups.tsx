import Card from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/groups")({
  component: RouteComponent,
});

const groups = [
  { id: "1", name: "Chillies", users: 10, description: "A chill group" },
  {
    id: "2",
    name: "raprap",
    users: 5,
    description: "A group for rap enthusiasts",
  },
  { id: "3", name: "yessir", users: 8, description: "A group for yessir fans" },
  { id: "4", name: "The Best", users: 12, description: "The best group ever" },
  {
    id: "5",
    name: "ipad kids ong",
    users: 7,
    description: "A group for iPad kids",
  },
  { id: "6", name: "The Best", users: 15, description: "Another great group" },
  { id: "7", name: "Chillies", users: 20, description: "A chill group" },
  {
    id: "8",
    name: "raprap",
    users: 3,
    description: "A group for rap enthusiasts",
  },
];
type GroupData = {
  id: string;
  name: string;
  users: number;
  description: string;
};

function RouteComponent() {
  return (
    <div className="mt-3 flex w-full flex-col items-center space-y-5">
      <div className="flex w-full max-w-6xl flex-col space-y-2">
        <div className="grid grid-cols-4 gap-2">
          {groups.slice(0, 6).map((group) => (
            <GroupCard key={group.id} data={group} compact />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-6xl flex-col space-y-2">
        <h2 className="text-lg font-semibold">Recommended For You</h2>
        <div className="grid grid-cols-3 gap-2">
          {groups.slice(0, 6).map((group) => (
            <GroupCard key={group.id} data={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupCard({ data, compact }: { data: GroupData; compact?: boolean }) {
  if (compact)
    return (
      <Card
        transparent
        className="hover:bg-card-hover flex w-full cursor-pointer flex-row items-center gap-3 rounded-xs shadow-xl ring-1 ring-black/25"
      >
        <img
          src={`https://www.picsum.photos/200/200?random=${Math.random()}`}
          alt={data.name}
          className="h-14 w-14 rounded-sm object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{data.name}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            {data.users} Users
          </p>
        </div>
      </Card>
    );

  return (
    <Card className="hover:bg-card-hover flex w-full cursor-pointer flex-row items-center gap-3 rounded-xs shadow-xl ring-1 ring-black/25">
      <img
        src={`https://www.picsum.photos/200/200?random=${Math.random()}`}
        alt={data.name}
        className="h-24 w-24 rounded-sm object-cover"
      />
      <div>
        <p className="font-semibold">{data.name}</p>
        <p className="text-muted-foreground text-xs">{data.description}</p>
        <p className="text-muted-foreground mt-1 text-xs">{data.users} Users</p>
      </div>
    </Card>
  );
}
