export function Card({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="rounded-xl bg-card text-card-foreground shadow overflow-hidden">
      {children}
    </div>
  )
}
