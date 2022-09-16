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
  cartPdtQty: number;
  pdtPrice: number;
}

export interface IViewCart {
  _id: number;
  cartPdtId: number;
  cartPdtPrice: number;
  cartUserId: number;
  cartPdtQty: number;
  productdetails: IPdtDetails[];
}

export interface IPdtDetails {
  _id: number;
  catId: string;
  pdtDesc: string;
  pdtName: string;
  pdtPrice: number;
  pdtCatId: string;
  pdtImgPath: string;
}
export interface IAddPdt {
  pdtCatId: number;
  pdtName: string;
  pdtPrice: number;
  pdtDesc: string;
  pdtImg: string;
}
