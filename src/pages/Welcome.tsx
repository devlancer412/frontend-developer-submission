import { isAddress } from 'ethers/lib/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useProvider } from '../hooks';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const provider = useProvider();
  const [address, setAddress] = useState<string>('')

  const viewGalleryHandler = async () => {
    if (!isAddress(address)) {
      toast.error("Invalid address");
      return;
    }

    const code = await provider.getCode(address);
    if (code === "0x") {
      toast.error("This is not contract address")
      return;
    }

    navigate(`/${address}`);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className='text-center text-xl md:text-6xl font-bold mb-5'>Welcome to My NFT Gallery</h1>
      <p className='text-md md:text-lg mb-4'>Insert NFT contract address here ▼</p>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Please input nft contract address"
        className="text-md ring-0 focus:ring-0 focus:outline-none border-[1px] rounded-md border-slate-600 border-opacity-40 w-full md:w-auto md:min-w-[600px] p-2"
      />
      <button
        type="button"
        className='btn-primary w-40 mt-4 rounded'
        onClick={viewGalleryHandler}>
        View Gallery
      </button>
    </div>
  )
}