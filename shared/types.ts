export type ArtistData = {
  id: string;
  name: string;
  image_url?: string;
};

export type GeneralPlaylistData = {
  id: string;
  name: string;
  image_url?: string;
  public: boolean;
  total: number;
  self?: boolean;
};

export type PlaylistData = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  public: boolean;
  total: number;
  owner: {
    id: string;
    display_name: string;
    external_urls: { spotify: string };
  };
};

export type UserProfile = {
  id: string;
  display_name: string;
  email: string;
  images?: { url: string }[];
};

export type TrackSearchResult = {
  id: string;
  name: string;
  artists: { name: string }[];
  image_url: string;
};

export type TrackInfoItem = {
  id: string;
  name: string;
  artists: string[];
  image_url: string;
};

export type CreatePost = {
  title: string;
  type: "text" | "track_id" | "playlist_id";
  content: string;
  allow_suggestions: boolean;
};

export type CreateView = {
  type: "post" | "playlist" | "user" | "artist";
  content_id: string;
};

export type Post = {
  id: string;
  title: string;
  type: "text" | "track_id" | "playlist_id";
  content: string | null;
  allow_suggestions: boolean | null;
  created_at: string | null;
  user_id: string | null;
  user_image_url: string | null;
};

export type Track = {
  id: string;
  name: string;
  artists: ArtistData[];
  album: {
    id: string;
    name: string;
    image_url: string;
  };
  duration_ms: number;
  external_urls: { spotify: string };
};

export type TrackSuggestion = {
  id: string;
  track_id: string;
  user_id: string | null;
};

export type Comment = {
  id: string;
  parent_comment_id: string | null;
  user_id: string | null;
  text: string;
  created_at: string;
  user_image_url: string | null;
  reply_count?: number | null;
  tagged_user_id?: string | null;
};

export const categories = [
  { value: "discussion", label: "Discussion" },
  { value: "help", label: "Help" },
  { value: "showcase", label: "Showcase" },
] as const;
export type CategoryValue = (typeof categories)[number]["value"];

export const tags = [
  { value: "acoustic", label: "Acoustic" },
  { value: "afrobeat", label: "Afrobeat" },
  { value: "alternative", label: "Alternative" },
  { value: "blues", label: "Blues" },
  { value: "classical", label: "Classical" },
  { value: "country", label: "Country" },
  { value: "disco", label: "Disco" },
  { value: "electronic", label: "Electronic" },
  { value: "experimental", label: "Experimental" },
  { value: "folk", label: "Folk" },
  { value: "hiphop", label: "Hip-Hop" },
  { value: "indie", label: "Indie" },
  { value: "instrumental", label: "Instrumental" },
  { value: "jazz", label: "Jazz" },
  { value: "jpop", label: "J-Pop" },
  { value: "kpop", label: "K-Pop" },
  { value: "latin", label: "Latin" },
  { value: "lofi", label: "Lo-Fi" },
  { value: "metal", label: "Metal" },
  { value: "pop", label: "Pop" },
  { value: "punk", label: "Punk" },
  { value: "reggae", label: "Reggae" },
  { value: "rnb", label: "R&B" },
  { value: "rock", label: "Rock" },
  { value: "soul", label: "Soul" },
  { value: "soundtrack", label: "Soundtrack" },
  { value: "world", label: "World" },
] as const;
export type Tag = (typeof tags)[number];
