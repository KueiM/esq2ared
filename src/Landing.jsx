import { useEffect, useRef } from 'react';

export function Landing({pieces,onSelect,onShop}){
 const photographs=pieces.flatMap(piece=>piece.images.map((image,index)=>({image,title:piece.short+(index?' / Detail '+index:''),piece})));
 const columns=[0,1,2].map(column=>photographs.filter((_,index)=>index%3===column));
 const gallery=useRef(null);
 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  function update(){
   frame=0;
   const section=gallery.current;
   if(!section)return;
   // Use the untransformed wrapper so scaling cannot feed back into progress.
   const bounds=section.getBoundingClientRect();
   const progress=Math.min(1,Math.max(0,(innerHeight-bounds.top)/(innerHeight+bounds.height)));
   const entered=Math.min(1,Math.max(0,(innerHeight-bounds.top)/innerHeight));
   const amplitude=innerWidth<810?.45:1;
   section.style.setProperty('--gallery-scale',motion.matches?1:.9+.1*entered);
   section.style.setProperty('--outer-drift',`${motion.matches?0:(320-640*progress)*amplitude}px`);
   section.style.setProperty('--middle-drift',`${motion.matches?0:(-400+800*progress)*amplitude}px`);
   const shop=document.getElementById('studio');
   const launch=document.getElementById('launch');
   document.documentElement.style.setProperty('--shop-glow',shop&&shop.getBoundingClientRect().top<innerHeight*.65&&(!launch||launch.getBoundingClientRect().top>=innerHeight)?'1':'0');
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);motion.addEventListener('change',schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule);document.documentElement.style.removeProperty('--shop-glow')};
 },[]);
 return <>
  <section className="landing-intro" aria-label="Esq2ared — original hand-painted clothing">
   <p className="landing-description">Original hand-painted clothing<br/>for people with a story to wear</p>
   <p className="landing-founder">By Eri Kazui</p>
   <span className="landing-monogram"><img src={import.meta.env.BASE_URL+'assets/esq2ared-logo.png'} alt="Esq2ared logo"/></span>
   <div className="landing-marquee"><h1 className="sr-only">Denim. Artwork. Originals.</h1><div className="landing-marquee-track" aria-hidden="true">{[0,1,2].map(i=><span key={i}>Denim&nbsp;&nbsp; Artwork&nbsp;&nbsp; Originals&nbsp;&nbsp;</span>)}</div></div>
   <button className="landing-cta" onClick={onShop}>Shop the originals</button>
  </section>
  <section ref={gallery} id="artwork" className="artwork-section" aria-label="Hand-painted artwork gallery">
   <div className="artwork-canvas"><div className="artwork-columns">{columns.map((items,column)=><div className={`artwork-column artwork-column-${column}`} key={column}>{items.map((item,i)=><button className="artwork-tile" key={i} onClick={()=>onSelect(item.piece)} aria-label={`Discover ${item.title}`}><div className={`artwork-photo artwork-crop-${(i+column)%3}`}><img src={(import.meta.env.BASE_URL+'assets/')+item.image} alt={item.title} loading="lazy"/></div><div className="artwork-caption"><span>{item.title}</span><span aria-hidden="true">↗</span></div></button>)}</div>)}</div></div>
  </section>
 </>
}
