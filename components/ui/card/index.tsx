import Image from "next/image"

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

export function CardHero({
  image,
}: {
  image: {
    url: string
    width: number
    height: number
    description: string
  }
}) {
  return !image?.url ? (
    <div className="aspect-square object-cover bg-muted" />
  ) : (
    <Image
      src={image?.url}
      width={image?.width}
      height={image?.height}
      alt={image?.description}
      className="aspect-square object-cover bg-muted"
    />
  )
}
