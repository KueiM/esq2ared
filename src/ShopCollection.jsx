import { useRef, useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const yen=value=>value==null?'Price on request':new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(value);

export function ShopCollection({pieces,filter,onFilter,onSelect}) {
 const track=useRef(null);
 const [expanded,setExpanded]=useState(false);
 const [position,setPosition]=useState(0);
 const catalog=pieces.filter(p=>(filter==='All'||p.type===filter)&&(expanded||filter!=='All'||p.featured));
 useEffect(()=>{setPosition(0);if(track.current)track.current.scrollLeft=0},[filter]);
 const ordered=catalog.map((_,index)=>catalog[(index+position)%catalog.length]);
 function move(direction){setPosition(previous=>(previous+direction+catalog.length)%catalog.length);track.current?.scrollTo({left:0,behavior:'smooth'})}
 return <section id="collection" className="shop-collection" aria-labelledby="shop-title">
  <div className="shop-bar"><span className="shop-brand">Store</span></div>
  <h2 id="shop-title">{expanded?'ALL PRODUCTS':filter==='All'?'RECOMMENDED':filter.toUpperCase()}</h2>
  {expanded&&<div className="shop-filters" aria-label="Product categories">{['All',...new Set(pieces.map(p=>p.type))].map(category=><button key={category} aria-pressed={filter===category} onClick={()=>onFilter(category)}>{category==='All'?'All products':category}</button>)}</div>}
  {!catalog.length&&<p className="store-empty">New originals are on their way.</p>}<div className="shop-carousel">
   {!expanded&&catalog.length>1&&<button className="shop-arrow previous" aria-label="Previous products" onClick={()=>move(-1)}><CaretLeft size={24}/></button>}
   <div ref={track} className={`shop-track ${expanded?'expanded':''}`} aria-label="Hand-painted denim collection">
    {(expanded?catalog:ordered).map(p=><article className="shop-card" key={p.id}><button className="shop-product" onClick={()=>onSelect(p)} aria-label={`View ${p.short}`}><div className="shop-image"><img src={(import.meta.env.BASE_URL+'assets/')+p.image} alt={p.short} loading="lazy" style={{objectPosition:p.position||'center'}}/></div><h3>{p.short}</h3><p>{yen(p.price)}</p>{(p.status!=='available'||p.stock===0)&&<span className="store-product-status">{p.stock===0?'Sold out':p.status.replaceAll('-',' ')}</span>}</button><span className="shop-swatch" style={{background:p.swatch}} role="img" aria-label={p.color} title={p.color}/></article>)}
   </div>
   {!expanded&&catalog.length>1&&<button className="shop-arrow next" aria-label="Next products" onClick={()=>move(1)}><CaretRight size={24}/></button>}
  </div>
  <button className="shop-view-all" onClick={()=>{setExpanded(!expanded);onFilter('All')}}>{expanded?'BACK TO RECOMMENDED':'VIEW ALL PRODUCTS'}</button>
 </section>
}
