import { Link } from "@tanstack/react-router";
import {
  Compass,
  DiscAlbum,
  Home,
  MessageCircleMore,
  Users,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Option = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const sidebar_options = {
  main: [
    {
      to: "/",
      label: "Home",
      icon: <Home size={20} />,
    },
    {
      to: "/explore",
      label: "Explore",
      icon: <Compass size={20} />,
    },
    {
      to: "/groups",
      label: "Groups",
      icon: <Users size={20} />,
    },
    {
      to: "/messages",
      label: "Messages",
      icon: <MessageCircleMore size={20} />,
    },
  ],
  personal: [
    {
      to: "/playlists",
      label: "Playlists",
      icon: <DiscAlbum size={20} />,
    },
  ],
};

export default function Sidebar() {
  return (
    <aside className="bg-muted sticky top-16 flex flex-col rounded-sm p-3 lg:w-full lg:max-w-70">
      {Object.entries(sidebar_options).map(([key, options], idx, arr) => (
        <div key={key}>
          <SidebarCategory options={options} />
          {idx < arr.length - 1 && <Separator className="my-3" />}
        </div>
      ))}
    </aside>
  );
}

function SidebarCategory({ options }: { options: Option[] }) {
  return (
    <ul>
      {options.map((option) => (
        <li key={option.to}>
          <Tooltip>
            <TooltipTrigger className="w-full" asChild>
              <Link
                to={option.to}
                className="[&.active]:bg-accent hover:bg-accent/50 flex items-center gap-4 rounded-sm px-3 py-3 text-sm [&.active]:font-semibold"
              >
                {option.icon}
                <span className="hidden sm:block">{option.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="sm:hidden">
              <p>{option.label}</p>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
