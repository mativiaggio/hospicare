type PageTitleProps = {
  title: string;
  subtitle: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="prose py-8">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
