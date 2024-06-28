// TODO:
// Finish and modularize Table
// Audit unused components (Lead, Large, Small, Muted)

export function H1({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function H2({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}

export function H3({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function H4({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

export function P({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

export function Blockquote({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

// export function Table({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <div className="my-6 w-full overflow-y-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
//               King's Treasury
//             </th>
//             <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
//               People's happiness
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Empty
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Overflowing
//             </td>
//           </tr>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Modest
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Satisfied
//             </td>
//           </tr>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Full
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Ecstatic
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }

export function UL({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}

export function OL({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
}

export function LI({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <li>{children}</li>
}

export function HR() {
  return <hr className="my-6 border-t" />
}

export function InlineCode({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

export function Lead({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <p className="text-xl text-muted-foreground">{children}</p>
}

export function Large({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="text-lg font-semibold">{children}</div>
}

export function Small({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <small className="text-sm font-medium leading-none">{children}</small>
}

export function Muted({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
