import { useForm } from "@tanstack/react-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormErrorList } from "@/components/page/form-errors";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { createPostMutationOptions } from "@/lib/api-options";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import CreatePostTrackSearch from "@/components/post/create-post/create-post-track-search";
import { useQueryClient } from "@tanstack/react-query";
import CreatePostPlaylistSearch from "./create-post-playlist-search";

const contentTypes = [
  { type: "text", label: "Text" },
  { type: "track_id", label: "Song" },
  { type: "playlist_id", label: "Playlist" },
] as const;
export type ContentType = (typeof contentTypes)[number];

export default function CreatePostForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    ...createPostMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-posts"] });
    },
  });
  const form = useForm({
    defaultValues: {
      title: "",
      type: "text" as "text" | "track_id" | "playlist_id",
      allow_suggestions: false,
      text: "",
      track_id: "",
      playlist_id: "",
    },
    onSubmit: async ({ value }) => {
      const formattedData = {
        title: value.title,
        type: value.type as "text" | "track_id" | "playlist_id",
        allow_suggestions: value.allow_suggestions,
        content:
          value.type === "text"
            ? value.text
            : value.type === "track_id"
              ? value.track_id
              : value.playlist_id,
      };
      mutate(formattedData, {
        onSuccess: () => {
          toast.success("Post created successfully!");
          router.navigate({ to: "/" });
        },
      });
    },
  });

  return (
    <div className="fl w-full max-w-2xl">
      <h3 className="text-2xl font-bold">Create a post</h3>

      <form.Subscribe
        selector={(state) => ({
          fieldMeta: state.fieldMeta,
          type: state.values.type,
        })}
      >
        {({ fieldMeta, type }) => {
          const allowedFields = ["title", type];
          const errors = Object.entries(fieldMeta)
            .filter(([field]) => allowedFields.includes(field))
            .flatMap(([, meta]) => meta.errors)
            .flat();
          return <FormErrorList errors={errors} />;
        }}
      </form.Subscribe>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mt-2 flex flex-col space-y-3"
      >
        <form.Field name="type">
          {(field) => (
            <div className="text-muted-foreground mb-3 flex shrink-0 items-center text-xs font-semibold">
              {contentTypes.map((contentType) => (
                <p
                  key={contentType.type}
                  className={cn(
                    "flex cursor-pointer items-center p-3 decoration-rose-500 transition-colors duration-100 hover:bg-white/10",
                    field.state.value === contentType.type &&
                      "text-foreground underline decoration-3 underline-offset-10",
                  )}
                  onClick={() => field.handleChange(contentType.type)}
                >
                  {contentType.label}
                </p>
              ))}
            </div>
          )}
        </form.Field>
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => {
              if (!value || value.trim() === "") {
                return "Title is required.";
              }
            },
          }}
        >
          {(field) => (
            <Input
              placeholder="Title*"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.type}>
          {(type) => {
            switch (type) {
              case "text":
                return (
                  <form.Field name="text" key="text">
                    {(field) => (
                      <Textarea
                        placeholder="Body text (optional)"
                        label="Body text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-26 resize-none"
                      />
                    )}
                  </form.Field>
                );
              case "track_id":
                return (
                  <form.Field
                    name="track_id"
                    key="track_id"
                    validators={{
                      onChange: ({ value }) => {
                        if (form.state.values.type !== "track_id") return null;
                        if (!value) {
                          return "Song selection is required.";
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <CreatePostTrackSearch
                        field={field}
                        onClick={(id) => field.handleChange(id)}
                      />
                    )}
                  </form.Field>
                );
              case "playlist_id":
                return (
                  <form.Field
                    name="playlist_id"
                    key="playlist_id"
                    validators={{
                      onChange: ({ value }) => {
                        if (form.state.values.type !== "playlist_id")
                          return null;
                        if (!value) {
                          return "Playlist ID is required.";
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <CreatePostPlaylistSearch
                        field={field}
                        onClick={(id) => field.handleChange(id)}
                      />
                    )}
                  </form.Field>
                );
              default:
                return null;
            }
          }}
        </form.Subscribe>
        {/* <form.Field name="type">
          {(field) => (
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Help</SelectItem>
                <SelectItem value="dark">Discussion</SelectItem>
                <SelectItem value="system">Showcase</SelectItem>
              </SelectContent>
            </Select>
          )}
        </form.Field> */}
        <form.Field name="allow_suggestions">
          {(field) => (
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-muted-foreground text-sm">
                  Allow user song suggestions to your post?
                </p>
              </div>
              <Switch
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked)}
              />
            </div>
          )}
        </form.Field>
        <Button type="submit" className="self-end" disabled={isPending}>
          Create post
        </Button>
      </form>
    </div>
  );
}
