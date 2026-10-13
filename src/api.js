export async function api(path,options={}){
 if(import.meta.env.VITE_STATIC_PREVIEW==='true'){if(path==='/api/catalog'){const response=await fetch(import.meta.env.BASE_URL+'catalog-preview.json');if(!response.ok)throw new Error('The collection could not be loaded.');return response.json()}throw new Error('This service is unavailable in the public preview.')}
 const response=await fetch(path,{...options,headers:{'X-Esq-Request':'1',...(options.body&&typeof options.body==='string'?{'Content-Type':'application/json'}:{}),...options.headers}});
 let data;try{data=await response.json()}catch{throw new Error('The store service is unavailable. Please try again.')}
 if(!response.ok){const error=new Error(data.error||'Request failed');error.status=response.status;throw error}return data;
}
let viewed=false;
export function track(kind,product=''){
 if(import.meta.env.VITE_STATIC_PREVIEW==='true')return;
 if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl)return;
 try{if(kind==='page_view'&&viewed)return;if(kind==='page_view')viewed=true;let session=sessionStorage.getItem('esq-visit');if(!session){session=crypto.randomUUID();sessionStorage.setItem('esq-visit',session)}api('/api/events',{method:'POST',body:JSON.stringify({kind,product,session})}).catch(()=>{})}catch{}
}
