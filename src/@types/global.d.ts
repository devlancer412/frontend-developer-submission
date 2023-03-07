type NFTType = "ERC721" | "ERC1155"

interface NFTData {
  address: string
  name: string
  symbol: string
  description: string
  type: NFTType
  id: number
  name: string
  imageUrl: string
  owner: string
  permalink: string
}

interface GalleryContextType {
  nfts: NFTData[]
  limit: number;
  nextCursor?: string
  prevCursor?: string
  error?: string
  load: (address: string, cursor?: string) => Promise<void>
}