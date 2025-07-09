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

export type PlaylistItem = {
  id: string;
  name: string;
  artists: { id: string; name: string; external_urls: { spotify: string } }[];
  duration_ms: number;
  album: {
    id: string;
    name: string;
    images: { url: string; height?: number; width?: number }[];
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
