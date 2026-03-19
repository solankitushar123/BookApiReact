import { useEffect, useState } from "react";
import { Loader } from "../../shared/components/loader";
import { ApiService } from '../../services';
import Grid from "../../shared/components/grid";
import BookForm from "./createBook";

interface BookItem {
  bookId: number;
  bookName: string;
  author: string;
  publishers: string;
  categoryId: number;
  categoryName: string;
}

type CreateBookDto = {
  bookName: string;
  author: string;
  publishers: string;
  categoryId: number;
};

export default function Books() {
  const [bookList, setBookList] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Fetch Books
  useEffect(() => {
    ApiService.get<BookItem[]>("books")
      .then(data => {
        setBookList(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // ✅ Create Book function (FIXED)
  const createBook = (newBook: CreateBookDto) => {
    ApiService.post<BookItem>("books", newBook)
      .then((data) => {
        // update UI
        setBookList(prev => [...prev, data]);

        // close modal
        setShowForm(false);
      })
      .catch(() => {
        console.error("Failed to create book");
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">

      {/* 🔹 Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
      >
        Add Book
      </button>

      {/* 🔹 Modal Form */}
      {showForm && (
        <BookForm
          onSubmit={createBook}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* 🔹 Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 tracking-wide">
        Books List
      </h2>

      {/* 🔹 Loader / Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <Grid<BookItem> data={bookList} />
      )}
    </div>
  );
}