import { providers } from "ethers"

export const useProvider = () => {
  return new providers.JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
}