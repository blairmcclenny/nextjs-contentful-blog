export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto px-4 md:px-8 lg:px-16 max-w-screen-xl">
      {children}
    </div>
  )
}
