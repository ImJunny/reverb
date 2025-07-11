import BackgroundWrapper from "@/components/page/background-wrapper";
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
    <BackgroundWrapper
      className="flex flex-col items-center p-3"
      type="gradient"
      options={{ resetColor: true }}
    >
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold">Groups</h1>
      </div>
      <div className="mt-3 flex flex-col space-y-5">
        <GroupSection title="Your Groups" />
        <GroupSection title="Recommended For You" />
      </div>
    </BackgroundWrapper>
  );
}

function GroupSection({ title }: { title: string }) {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {groups
          .slice(0, Math.floor(Math.random() * groups.length) + 4)
          .map((group) => (
            <GroupCard key={group.id} data={group} />
          ))}
      </div>
    </div>
  );
}

function GroupCard({ data }: { data: GroupData }) {
  return (
    <Card className="hover:bg-card-hover flex w-80 cursor-pointer flex-row items-center gap-3 rounded-xs shadow-xl ring-1 ring-black/25">
      <img
        src={`https://www.picsum.photos/200/200?random=${Math.random()}`}
        alt={data.name}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div>
        <p className="text-sm">{data.name}</p>
        <p className="text-muted-foreground text-xs">{data.description}</p>
        <p className="text-muted-foreground mt-1 text-xs">{data.users} Users</p>
      </div>
    </Card>
  );
}
