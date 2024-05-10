export interface Category {
  categoryId: string;
  categoryName: string;
  items: MenuItem[];
}

export interface MenuItem {
  menuId: string;
  itemName: string;
  price: number;
  availability: boolean;
  imagePath: string;
  categoryId: string;
}

export interface CategoryItems {
  categoryId: string;
  categoryName: string;
}
