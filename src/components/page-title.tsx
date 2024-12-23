import { cn } from "@/lib/utils";

type PageTitleProps = {
  className: string;
  title: string;
  titleClassName?: string;
  icon?: React.ReactElement;
  subtitle?: string;
};

export function PageTitle({
  className,
  title,
  titleClassName,
  icon,
  subtitle,
}: PageTitleProps) {
  return (
    <div className={cn("prose py-6 xl:py-8", className)}>
      <h1
        className={cn(
          "text-3xl xl:text-4xl font-semibold flex gap-2 items-center",
          titleClassName
        )}>
        {title} {icon}
      </h1>
      <p className="text-base xl:text-xl text-muted-foreground">{subtitle}</p>
    </div>
  );
}
