import { isAddress } from "ethers/lib/utils";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useProvider } from "../hooks";

const Header = () => {
  const provider = useProvider();
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');

  const viewGalleryHandler = async () => {
    if (!isAddress(address)) {
      toast.error("Invalid address");
      return;
    }

    const code = await provider.getCode(address);
    if (code !== "0x") {
      toast.error("This is not contract address")
      return;
    }

    navigate(`/${address}`);
  }

  return <div className="w-full shadow-md shadow-slate-600 p-4">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-start gap-3">
      <h3 className="text-xl lg:text-4xl font-bold">React Frontend Development Submission</h3>
      <div className="flex flex-row items-center w-full md:w-auto">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Please input address here"
          className="flex-1 text-md ring-0 focus:ring-0 focus:outline-none border-[1px] rounded-md border-slate-600 border-opacity-40 min-w-[300px] p-2"
        />
        <button
          type="button"
          className='btn-primary p-1! ml-1 rounded'
          onClick={viewGalleryHandler}>
          →
        </button>
      </div>
    </div>
  </div>
}

export default Header;