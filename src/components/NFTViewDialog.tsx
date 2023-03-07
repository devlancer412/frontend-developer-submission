/* eslint-disable jsx-a11y/img-redundant-alt */
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from '@heroicons/react/24/solid';

import { Fragment, useEffect } from "react";
import { useGallery } from "../hooks";
import { shortenAddress } from './../services/utils';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  nft?: NFTData;
}

export const NFTViewDialog: React.FC<Props> = ({ isOpen, setIsOpen, nft }) => {
  const { collection } = useGallery();
  useEffect(() => {
    if (!nft) {
      setIsOpen(false)
    }
  }, [nft, setIsOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 w-[600px] rounded-lg opacity-100 scale-100 border-2 border-gray-600">
            <Dialog.Title className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="text-black text-md 2xl:text-lg font-bold">
                  NFT Data
                </div>
              </div>
              <span
                className="opacity-50 cursor-pointer hover-transition hover:opacity-100"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon width={24} height={24} title="close" />
              </span>
            </Dialog.Title>
            <div className="flex w-full h-px border border-gray-600 bg-slate-600" />
            <Dialog.Description className="flex flex-col gap-2 p-6">
              <div className="w-full flex flex-row items-center gap-4">
                <img className="w-[280px]" src={nft?.imageUrl} alt="Collection Image" />
                <div className="flex flex-col items-start">
                  <h3 className="text-4xl font-bold mb-5">{nft?.name}</h3>
                  <p className="text-lg font-bold">Owner: {shortenAddress(nft?.owner ?? '')}</p>
                  <a
                    className='btn-primary w-40 mt-4 rounded'
                    target="_blank"
                    href={`https://opensea.io/assets/ethereum/${collection?.address}/${nft?.id}`}
                    rel="noreferrer"
                  >
                    Purchase Now
                  </a>
                </div>
              </div>
            </Dialog.Description>
            <Dialog.Backdrop>
              <div
                className="fixed inset-0 opacity-100 bg-black-600 bg-opacity-70"
                aria-hidden="true"
              />
            </Dialog.Backdrop>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
