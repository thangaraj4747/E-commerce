export interface IListProducts {
  pdtCatId: number;
  pdtName: string;
  pdtPrice: number;
  pdtDesc: string;
  pdtImg: string;
}

export interface ICategory {
  _id: number;
  catName: string;
}

export interface IAddtoCart {
  cartPdtId: number;
  cartPdtPrice: number;
}

export interface IUpdateCart {
  cartId: number;
  cartQty: number;
  pdtPrice: number;
}

export interface IViewCart {
  _id: number;
  cartPdtId: number;
  cartPdtPrice: number
  cartUserId: number;
  cartQty: number
  orderdetails: IPdtDetails[];
}

export interface IPdtDetails {
  _id: number;
  productDesc: string
  productName: string
  productPrice: number;
  productcatId: string
  productImgPath: string;
}
export interface IAddPdt {
  pdtCatId: number;
  pdtName: string;
  pdtPrice: number;
  pdtDesc: string;
  pdtImg: string;
}
