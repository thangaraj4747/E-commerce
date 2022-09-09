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
