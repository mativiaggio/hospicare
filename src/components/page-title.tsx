type PageTitleProps = {
  title: string;
  icon?: React.ReactElement;
  subtitle: string;
};

export function PageTitle({ title, icon, subtitle }: PageTitleProps) {
  return (
    <div className="prose py-8">
      <h1 className="text-4xl font-semibold flex gap-2 items-center">
        {title} {icon}
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
