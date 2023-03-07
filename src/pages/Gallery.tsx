/* eslint-disable jsx-a11y/img-redundant-alt */
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useGallery } from "../hooks";
import { LoadingSpinner, NFTViewDialog } from './../components';

export const GalleryPage = () => {
  const navigate = useNavigate();
  const { address } = useParams<{ address: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [currentNft, setCurrentNft] = useState<NFTData>();
  const { nfts, nextCursor, prevCursor, load } = useGallery();

  const handleCardClick = (nft: NFTData) => {
    setCurrentNft(nft);
    setIsDetailOpen(true);
  }

  const handleLoad = async (cursor?: string) => {

    if (!address) {
      navigate('/');
      return;
    }

    try {
      setIsLoading(true);
      await load(address, cursor);
    } catch (err) {
      navigate('/error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleLoad(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container gap-10 py-10 mx-auto">
      <NFTViewDialog isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} nft={currentNft} />
      <div className="w-full my-5 flex flex-row justify-start items-center">
        {
          prevCursor && <button
            type="button"
            className='btn-primary w-40 mt-4 rounded'
            onClick={() => handleLoad(prevCursor)}>
            Previous
          </button>
        }
        {
          nextCursor && <button
            type="button"
            className='btn-primary w-40 mt-4 rounded'
            onClick={() => handleLoad(nextCursor)}>
            Next
          </button>
        }
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-auto">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl h-fit"
            onClick={() => handleCardClick(nft)}
          >
            <img className="w-full" src={nft.imageUrl} alt="NFT image" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{nft.name}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}