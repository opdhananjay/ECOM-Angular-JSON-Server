export interface signup{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string
    password:string,
   
}


export interface Product{
    name:string,
    price:string,
    category:string,
    desc:string,
    img:string,
    id:number,
    quantity:  number | 1,
    productId:undefined | number
}


export interface cart{
    name:string,
    price:string,
    category:string,
    desc:string,
    img:string,
    id:number | undefined,
    quantity:number | 1,
    userId:number,
    productId:number
}


export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}


export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}