import { useContext } from "react"
import { GalleryContext } from "../contexts/GalleryContext"

export const useGallery = () => {
  return useContext(GalleryContext) as GalleryContextType;
}