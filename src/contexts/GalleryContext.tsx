import React, { PropsWithChildren, useEffect, useState } from "react";
import { Contract } from 'ethers';
import { useProvider } from "../hooks";
import openSeaApi from "../services/openSeaApi";
import { ERC1155Abi, ERC721Abi } from "../assets/abis";

export const GalleryContext = React.createContext<GalleryContextType | null>(
  null
);

const GalleryContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const provider = useProvider();
  const [collection, setCollection] = useState<CollectionData>()
  const [startId, setStartId] = useState<number>(0)
  const [size, setSize] = useState<number>(16)
  const [nfts, setNfts] = useState<NFTData[]>([])
  const [error, setError] = useState<string>('');

  const loadCollection = async (address: string) => {
    // const erc165Contract = new Contract(address, ERC165Abi, provider);
    // let contractType: NFTType = "ERC721"

    // try {
    //   if (await erc165Contract.supportsInterface(ERC721ID)) {
    //     contractType = "ERC721";
    //   } else if (await erc165Contract.supportsInterface(ERC1155Abi)) {
    //     contractType = "ERC1155"
    //   } else {
    //     setError("Invalid contract address");
    //     throw Error("Invalid contract address");
    //   }

    //   let nftContract = new Contract(address, contractType === "ERC721" ? ERC721Abi : ERC1155Abi, provider);
    //   const nftName = await nftContract.name();
    //   const nftSymbol = await nftContract.symbol();
    //   let totalSupply: number | undefined = undefined;
    //   if (contractType === "ERC721") {
    //     totalSupply = await nftContract.totalSupply();
    //   }


    // } catch (err) {
    //   console.log(err)
    // }
    const response = await openSeaApi.get(`/asset_contract/${address}`);

    const { asset_contract_type, name, symbol, schema_name, collection } = response.data;

    if (asset_contract_type !== "non-fungible" && asset_contract_type !== "semi-fungible") {
      console.log(asset_contract_type);
      setError("Incorrect NFT contract address");
      throw Error("Incorrect NFT contract address");
    }

    const collectionResponse = await openSeaApi.get(`/collection/${collection.slug}`)

    setCollection({
      address,
      name,
      symbol,
      type: schema_name,
      openseaSlug: collection.slug,
      totalSupply: collectionResponse.data.collection.stats.total_supply,
      imageUrl: collectionResponse.data.collection.image_url,
    })
  }

  const onSelectPage = (offset: number) => {
    setStartId(offset);
  };

  const setPageSize = (size: number) => {
    setSize(size)
  }

  useEffect(() => {
    if (!collection) {
      return;
    }

    (async () => {
      let url = `/assets?asset_contract_address=${collection.address}&order_direction=desc&include_orders=false&limit=${size}`;
      for (let i = 0; i <= size && (startId + i) <= collection.totalSupply; i++) {
        const tokenId = startId + i;
        url += `&token_ids=${tokenId}`;
      }

      const response = await openSeaApi.get(url);

      const nfts = (response.data.assets as any[] ?? []).map((asset: any) => {
        const { token_id, name, image_url, owner, creator } = asset;
        return {
          id: parseInt(token_id),
          name: name,
          imageUrl: image_url,
          owner: undefined
        }
      }).sort((a, b) => a.id - b.id);

      setNfts(nfts)

      if (collection.type === "ERC721") {
        try {
          let nftContract = new Contract(collection.address, ERC721Abi, provider);
          for (const nft of nfts) {
            nft.owner = await nftContract.ownerOf(nft.id)
            setNfts(nfts)
          }

        } catch (err) {
        }
      }

    })()
  }, [collection, provider, size, startId])

  return (
    <GalleryContext.Provider value={{ collection, startId, size, nfts, error, loadCollection, onSelectPage, setPageSize }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
