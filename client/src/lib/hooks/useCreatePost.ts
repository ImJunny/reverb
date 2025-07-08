import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TrackInfoItem } from "shared/types";

type CreatePostContextType =
  | {
      selectedTrackInfo: TrackInfoItem | null;
      setSelectedTrackInfo: Dispatch<SetStateAction<TrackInfoItem | null>>;
    }
  | undefined;

export const CreatePostContext =
  createContext<CreatePostContextType>(undefined);

export function useCreatePost() {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error("useCreatePost must be used within a CreatePostProvider");
  }
  return context;
}
