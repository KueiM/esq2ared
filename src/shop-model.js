export function normalizeBag(items,products){
 const totals=new Map(),result=[];
 for(const item of Array.isArray(items)?items:[]){
  if(!item||!Number.isInteger(item.quantity)||item.quantity<1)continue;
  const product=products.find(p=>p.id===item.id);
  if(!product||!['available','made-to-order'].includes(product.status)||!product.sizes.includes(item.size))continue;
  const quantity=Math.min(item.quantity,Math.max(0,(product.stock??999)-(totals.get(item.id)||0)));
  if(!quantity)continue;
  totals.set(item.id,(totals.get(item.id)||0)+quantity);
  const existing=result.find(p=>p.id===item.id&&p.size===item.size);
  if(existing)existing.quantity+=quantity;else result.push({id:item.id,size:item.size,quantity});
 }
 return result;
}
