import { useState } from 'react';
export function ProductGallery({piece}) {
 const images=piece.images||[piece.image];
 const [active,setActive]=useState(0);
 return <div className="product-gallery"><img className="product-main-photo" src={(import.meta.env.BASE_URL+'assets/')+images[active]} alt={`${piece.short} — photograph ${active+1} of ${images.length}`}/>{images.length>1&&<div className="product-thumbnails" aria-label={`${piece.short} photographs`}>{images.map((image,index)=><button key={image} aria-label={`View photograph ${index+1}`} aria-pressed={active===index} onClick={()=>setActive(index)}><img src={(import.meta.env.BASE_URL+'assets/')+image} alt=""/></button>)}</div>}</div>
}
