import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createFileRoute } from "@tanstack/react-router";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { useForm } from "@tanstack/react-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormErrorList } from "@/components/page/form-errors";
import { z } from "zod";
import { ChevronRight, Plus } from "lucide-react";
import Card from "@/components/ui/card";

export const Route = createFileRoute("/_protected/create-post")({
  component: RouteComponent,
});

const contentTypes = [
  { type: "text", label: "Text" },
  { type: "track", label: "Song" },
  { type: "playlist", label: "Playlist" },
  { type: "none", label: "None" },
] as const;

export type ContentType = (typeof contentTypes)[number];

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: "",
      type: "text",
      content: "",
    },
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <BackgroundWrapper className="p-3">
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
          <form.Field
            name="title"
            validators={{
              onChange: z
                .string()
                .min(10, "Title must be at least 10 characters."),
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

          <form.Subscribe selector={(state) => state.values.type}>
            {(type) => {
              switch (type) {
                case "text":
                  return (
                    <form.Field
                      name="content"
                      validators={{
                        onChange: z
                          .string()
                          .min(10, "Body text must be at least 10 characters."),
                      }}
                    >
                      {(field) => (
                        <Textarea
                          placeholder="Body text*"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-26 resize-none"
                        />
                      )}
                    </form.Field>
                  );
                case "track":
                  return (
                    <form.Field
                      name="content"
                      validators={{
                        onChange: z.string().min(1, "Track required."),
                      }}
                    >
                      {(field) => (
                        <>
                          {!field.state.value ? (
                            <Dialog>
                              <DialogTrigger>
                                <Card className="flex h-22 cursor-pointer flex-row items-center justify-center space-x-2 border-2 border-dashed bg-transparent hover:bg-black/10">
                                  <Plus size={16} />
                                  <p className="text-sm">Select a song</p>
                                </Card>
                              </DialogTrigger>
                              <DialogContent className="flex h-full max-h-120 flex-col gap-2 rounded-xs border-none p-3">
                                <DialogTitle className="text-lg font-semibold">
                                  Search a song
                                </DialogTitle>

                                <Input
                                  className="w-full"
                                  placeholder="Search title, artist, etc..."
                                  label="Song"
                                />
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Card className="bg-background flex flex-row items-center">
                              <div className="flex aspect-square h-16 rounded-xs bg-white/20" />

                              <div className="ml-3 flex flex-col">
                                <h3 className="text-sm">Test Title</h3>
                                <p className="text-muted-foreground text-xs">
                                  Artist Name
                                </p>
                              </div>
                              <div className="text-muted-foreground mr-4 ml-auto flex items-center space-x-2">
                                <p className="text-xs">Change</p>
                                <ChevronRight />
                              </div>
                            </Card>
                          )}
                        </>
                      )}
                    </form.Field>
                  );
                case "playlist":
                  return (
                    <form.Field
                      name="content"
                      validators={{
                        onChange: z.string().min(1, "Playlist required."),
                      }}
                    >
                      {(field) => (
                        <Input
                          placeholder="Playlist ID"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  );
                default:
                  return null;
              }
            }}
          </form.Subscribe>

          <Button type="submit" className="self-end">
            Create post
          </Button>
        </form>
      </div>
    </BackgroundWrapper>
  );
}
