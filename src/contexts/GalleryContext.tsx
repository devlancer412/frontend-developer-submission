import React, { PropsWithChildren, useEffect, useState } from "react";
import openSeaApi from "../services/openSeaApi";

export const GalleryContext = React.createContext<GalleryContextType | null>(
  null
);

const GalleryContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [nfts, setNfts] = useState<NFTData[]>([])
  const [limit, setLimit] = useState<number>(8);
  const [nextCursor, setNextCursor] = useState<string>()
  const [prevCursor, setPrevCursor] = useState<string>()
  const [error, setError] = useState<string>('');

  const load = async (address: string, cursor?: string) => {
    try {
      let url = `/assets?owner=${address}&limit=${limit}`;
      if (cursor) {
        url += `&cursor=${cursor}`;
      }
      const response = await openSeaApi.get(url);

      console.log(response.data)
      setNextCursor(response.data.next);
      setPrevCursor(response.data.previous);

      setNfts(response.data.assets.map((asset: any) => {
        return {
          address: asset.asset_contract.address,
          name: asset.name,
          symbol: asset.asset_contract.symbol,
          description: asset.collection.description,
          type: asset.asset_contract.schema_name,
          id: parseInt(asset.token_id),
          imageUrl: asset.image_url,
          owner: asset.creator.address,
          permalink: asset.permalink,
        }
      }))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <GalleryContext.Provider value={{ nfts, limit, nextCursor, prevCursor, error, load }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
