import { useState } from "react";

type CreateBookDto = {
  bookName: string;
  author: string;
  publishers: string;
  categoryId: number;
};

interface Props {
  onSubmit: (data: CreateBookDto) => void;
  onClose: () => void;
}

export default function BookForm({ onSubmit, onClose }: Props) {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [publishers, setPublishers] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (
      bookName.trim() === "" ||
      author.trim() === "" ||
      publishers.trim() === "" ||
      categoryId === "" ||
      categoryId <= 0
    ) {
      setError("All fields are required");
      return;
    }

    onSubmit({
      bookName,
      author,
      publishers,
      categoryId: Number(categoryId),
    });

    // clear form
    setBookName("");
    setAuthor("");
    setPublishers("");
    setCategoryId("");
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl"
        >
          ✖
        </button>

        <h3 className="text-xl font-bold mb-4 text-center">Create Book</h3>

        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="border p-2 rounded w-full mb-2 text-black"
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded w-full mb-2 text-black"
        />

        <input
          placeholder="Publisher"
          value={publishers}
          onChange={(e) => setPublishers(e.target.value)}
          className="border p-2 rounded w-full mb-2 text-black"
        />

        <input
          type="number"
          placeholder="Category Id"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border p-2 rounded w-full mb-4 text-black"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Create Book
        </button>

      </div>
    </div>
  );
}