declare namespace Master {

  /* ------------------ BOOK ------------------ */

  interface BookItem {

    bookId: number;
    bookName: string;
    author: string;
    publishers: string;
    categoryId: number;
    categoryName?: string;

  }

  interface BookForm {

    bookName: string;
    author: string;
    publishers: string;
    categoryId: number;

  }


  /* ------------------ CATEGORY ------------------ */

  interface CategoryItem {

    categoryId: number;
    categoryName: string;

  }

  interface CategoryForm {

    categoryName: string;

  }

}