export const samplePrompt = "I’m going to a friend’s wedding in New York, Friday to Sunday. I’d love to pack light."
export const categories = {tee:'T-shirt',trousers:'Trousers',shirt:'Dress shirt',formal:'Wedding outfit',jacket:'Light jacket'} as const
export type Category = keyof typeof categories
export type Item = {id:string, name:string, category:Category}
export const sampleItems:Item[]=[{id:'photo-tee',name:'Sage T-shirt',category:'tee'},{id:'photo-trousers',name:'Navy trousers',category:'trousers'}]
export const savedJacket:Item={id:'saved-jacket',name:'Everyday jacket',category:'jacket'}
export function plan(items:Item[], dinner:boolean){
 const occasions:{title:string, label:string, needs:Category[]}[]=[
 {title:'Travel days',label:'Fri & Sun · Casual',needs:['tee','trousers']},
 ...(dinner?[{title:'Rehearsal dinner',label:'Friday · Business casual',needs:['shirt','trousers'] as Category[]}]:[]),
 {title:'Wedding ceremony',label:'Saturday · Formal',needs:['formal']},
 {title:'Cool evenings',label:'Optional layer · 11°C',needs:['jacket']}]
 const selections = new Map<Category,Item>()
 for(const occasion of occasions) for(const category of occasion.needs){
 const item=items.find(i=>i.category===category)
 if(item) selections.set(category,item)
 }
 return {occasions,selections}
}
