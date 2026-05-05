import { CollectionSlug, PayloadRequest } from 'payload'

export interface PreviewSearchParams {
  path: string
  previewSecret: string
}

const collectionPrefixMap: Partial<Record<string, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: CollectionSlug
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)

  const params: PreviewSearchParams = {
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  }

  const encodedParams = new URLSearchParams(params as any)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
