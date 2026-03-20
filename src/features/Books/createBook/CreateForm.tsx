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
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-md relative border border-white/30 animate-fadeIn">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg transition"
      >
        ✖
      </button>

      <h3 className="text-2xl font-semibold mb-5 text-center text-gray-800 tracking-wide">
        Create Book
      </h3>

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      {/* Inputs */}
      <input
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
      />

      <input
        placeholder="Publisher"
        value={publishers}
        onChange={(e) => setPublishers(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
      />

      <input
        type="number"
        placeholder="Category Id"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="w-full mb-5 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
      />

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
      >
        Create Book
      </button>

    </div>
  </div>
);
}