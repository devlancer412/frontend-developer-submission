/* eslint-disable jsx-a11y/img-redundant-alt */
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useGallery } from "../hooks";
import { LoadingSpinner, Pagination, NFTViewDialog } from './../components';

export const GalleryPage = () => {
  const navigate = useNavigate();
  const { address: nftAddress } = useParams<{ address: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [currentNft, setCurrentNft] = useState<NFTData>();
  const { collection, nfts, startId, size, loadCollection, onSelectPage } = useGallery();

  const handleCardClick = (nft: NFTData) => {
    setCurrentNft(nft);
    setIsDetailOpen(true);
  }

  useEffect(() => {
    if (nftAddress !== collection?.address) {
      (async () => {
        if (!nftAddress) {
          navigate('/');
          return;
        }

        try {
          setIsLoading(true);
          await loadCollection(nftAddress);
          setIsLoading(false);
        } catch (err) {
          navigate('/error')
        }
      })();
    }
  }, [nftAddress, collection?.address, loadCollection, navigate]);

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!collection) {
    navigate("/error");
  }

  return (
    <div className="container gap-10 py-10 mx-auto">
      <NFTViewDialog isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} nft={currentNft} />
      <div className="w-full my-10 flex flex-col md:flex-row justify-between items-end gap-3">
        <div className="w-full flex flex-row items-center gap-4">
          <img className="w-32" src={collection?.imageUrl} alt="Collection Image" />
          <div className="flex flex-col items-start">
            <h3 className="text-xl md:text-4xl font-bold mb-5">{collection?.name}</h3>
            <p className="text-lg font-bold">{collection?.symbol}</p>
            <p>{collection?.totalSupply ?? '-'} items</p>
          </div>
        </div>
        <Pagination size={size} total={collection?.totalSupply ?? 0} current={startId} onSelect={(offset) => onSelectPage(offset)} />
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