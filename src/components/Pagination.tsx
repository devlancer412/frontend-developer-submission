import React from 'react';

type Props = {
  total: number;
  current: number;
  onSelect: (offset: number) => void;
  size?: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  current,
  onSelect,
  size = 10,
}) => {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-center my-5'>
      <div className='flex flex-row items-center mb-6 md:mb-0'>
        <h3 className='text-graphit font-medium text-[21px] leading-[26px] mr-5 text-[#484848]'>
          Total
        </h3>
        <div className='flex flex-row md:mr-10 text-[#484848] items-end'>
          {current > size ? (
            <>
              <div
                className='text-center border border-[#484848] rounded-[7px] flex justify-center items-center min-w-[36px] h-[36px] px-2 hover:cursor-pointer mr-1 last:mr-0 hover:border-[#C3C3C3]'
                onClick={() => onSelect(0)}
              >
                1
              </div>
              {current > 2 * size - 1 ? <div className='mr-2'>...</div> : null}
            </>
          ) : (
            <></>
          )}
          {current > 0 ? (
            <div
              className='text-center border border-[#484848] rounded-[7px] flex justify-center items-center min-w-[36px] h-[36px] px-2 hover:cursor-pointer mr-1 last:mr-0 hover:border-[#C3C3C3]'
              onClick={() => onSelect(current - size)}
            >
              {Math.floor(current / size)}
            </div>
          ) : (
            <></>
          )}
          <div className='text-center border border-[#C3C3C3] rounded-[7px] text-[#D4D4D4] flex justify-center items-center w-[36px] h-[36px] hover:cursor-pointer mr-1 last:mr-0'>
            {Math.floor(current / size) + 1}
          </div>
          {current < total - size ? (
            <div
              className='text-center border border-[#484848] rounded-[7px] flex justify-center items-center min-w-[36px] h-[36px] px-2 hover:cursor-pointer mr-1 last:mr-0 hover:border-[#C3C3C3]'
              onClick={() => onSelect(current + size)}
            >
              {Math.floor(current / size) + 2}
            </div>
          ) : (
            <></>
          )}
          {current < total - 2 * size ? (
            <>
              {current < total - 3 * size ? (
                <div className='mr-2'>...</div>
              ) : null}
              <div
                className='text-center border border-[#484848] rounded-[7px] flex justify-center items-center min-w-[36px] h-[36px] px-2 hover:cursor-pointer mr-1 last:mr-0 hover:border-[#C3C3C3]'
                onClick={() => onSelect(Math.floor(total / size - 1) * size)}
              >
                {Math.floor((total - 1) / size) + 1}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='flex flex-row text-[#15171B]'>
        <div
          className={`text-center border border-transparent rounded-[7px] flex justify-center items-center w-[36px] h-[36px] mr-1 hover:border-[#C3C3C3] flex-col bg-gradient-to-br ${current < size ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'
            }`}
          onClick={() => (current >= size ? onSelect(current - size) : null)}
        >
          Prev
        </div>
        <div
          className={`text-center border border-transparent rounded-[7px] flex justify-center items-center w-[36px] h-[36px] mr-0 hover:border-[#C3C3C3] flex-col bg-gradient-to-bl ${current > total - size
            ? 'hover:cursor-not-allowed'
            : 'hover:cursor-pointer'
            }`}
          onClick={() =>
            current <= total - size ? onSelect(current + size) : null
          }
        >
          Next
        </div>
      </div>
    </div>
  );
};