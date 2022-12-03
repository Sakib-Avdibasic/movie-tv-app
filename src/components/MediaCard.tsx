import { useState, useEffect, FC, useRef } from "react"
import { Media } from "../App"
import './MediaCard.css';

interface MediaCardProps {
  media: Media
}

const MediaCard:FC<MediaCardProps> = ({media}) => {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [hasImage, setHasImage] = useState<Boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const title = media.title || media.name;

  useEffect(() => {
    if(imgRef.current) {
      const loadingComplete = imgRef.current.complete;
      setIsLoaded(loadingComplete);
    }
    setHasImage(true);
  }, [media])

  return (
    <article className="media-card" style={isLoaded ? {} : {display: 'none'}} title={title}>
      <img ref={imgRef} src={hasImage ? `https://www.themoviedb.org/t/p/w220_and_h330_face${media.poster_path}` : 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'} 
        onLoad={() => {
          setIsLoaded(true);
        }}
        onError={() => {
          setIsLoaded(true);
          setHasImage(false);
        }} />
      <h2 className='ellipsis-overflow'>{title}</h2>
    </article>
  )
}

export default MediaCard;
