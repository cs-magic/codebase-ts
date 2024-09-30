import { cn } from "@cs-magic/shadcn/lib/utils";
import { Badge } from "@cs-magic/shadcn/ui/badge";

export const Tags = ({ tags }: { tags: string[] | null | undefined }) => {
  if (!tags?.length) return null;

  return (
    <div className={"flex flex-wrap items-center gap-0"}>
      {tags.slice(0, 3).map((tag) => (
        <Badge
          className={cn(
            "text-nowrap",
            "bg-transparent",
            "text-primary2/75",
            // "px-0"
            // "bg-muted"
          )}
          key={tag}
        >
          #{tag}
        </Badge>
      ))}
    </div>
  );
};
