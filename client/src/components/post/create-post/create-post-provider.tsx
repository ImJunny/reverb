import { CreatePostContext } from "@/lib/hooks/useCreatePost";
import { useState, type ReactNode } from "react";
import type { TrackInfoItem } from "shared/types";

export function CreatePostProvider({ children }: { children: ReactNode }) {
  const [selectedTrackInfo, setSelectedTrackInfo] =
    useState<TrackInfoItem | null>(null);

  return (
    <CreatePostContext.Provider
      value={{
        selectedTrackInfo,
        setSelectedTrackInfo,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}
