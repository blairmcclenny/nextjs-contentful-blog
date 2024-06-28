import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  HR,
  LI,
  OL,
  P,
  UL,
} from "@/components/typography"

// TODO
// Audit and update types (richText, options)

const defaultOptions = {
  renderMark: {},
  renderNode: {
    [BLOCKS.HEADING_1]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <H3>{children}</H3>,
    [BLOCKS.HEADING_4]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <H4>{children}</H4>,
    [BLOCKS.PARAGRAPH]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <P>{children}</P>,
    [BLOCKS.UL_LIST]: (node: React.ReactNode, children: React.ReactElement) => (
      <UL>{children}</UL>
    ),
    [BLOCKS.OL_LIST]: (node: React.ReactNode, children: React.ReactElement) => (
      <OL>{children}</OL>
    ),
    [BLOCKS.LIST_ITEM]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <LI>{children}</LI>,
    [BLOCKS.HR]: () => <HR />,
    [BLOCKS.QUOTE]: (node: React.ReactNode, children: React.ReactElement) => (
      <Blockquote>{children}</Blockquote>
    ),
  },
}

export default function renderRichText(
  richText: any,
  options: any = defaultOptions
) {
  if (!richText) return null

  return documentToReactComponents(richText, options)
}
