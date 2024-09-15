export interface ISheetPOST {
  [key: string]: { cell: string; value: string }[];
}
export interface IDBCreate {
  item_id: number;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
}
