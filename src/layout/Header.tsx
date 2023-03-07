import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');

  return <div className="w-full shadow-md shadow-slate-600 p-4">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-start gap-3">
      <h3 className="text-xl lg:text-4xl font-bold">React Frontend Development Submission</h3>
      <div className="flex flex-row items-center w-full md:w-auto">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Please input nft contract address"
          className="flex-1 text-md ring-0 focus:ring-0 focus:outline-none border-[1px] rounded-md border-slate-600 border-opacity-40 min-w-[300px] p-2"
        />
        <button
          type="button"
          className='btn-primary p-1! ml-1 rounded'
          onClick={() => navigate(`/${address}`)}>
          →
        </button>
      </div>
    </div>
  </div>
}

export default Header;