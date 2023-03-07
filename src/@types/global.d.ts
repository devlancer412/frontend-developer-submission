type NFTType = "ERC721" | "ERC1155"

interface CollectionData {
  address: string
  name: string
  symbol: string
  type: NFTType
  totalSupply: number
  imageUrl: string
  openseaSlug: string
}

interface NFTData {
  id: number
  name: string
  imageUrl: string
  owner?: string
}

interface GalleryContextType {
  collection: CollectionData | undefined;
  startId: number
  size: number
  nfts: NFTData[]
  error?: string
  loadCollection: (address: string) => Promise<void>
  onSelectPage: (offset: number) => void
  setPageSize: (size: number) => void
}