import './index.css';
import { useEffect, useState } from "react";
import './index.css';

interface Count {
  totalBooks: number;
  totalMembers: number;
  totalCategories: number;
  totalIssued: number;
}

export default function Home() {
  const [counts, setCounts] = useState<Count>({
    totalBooks: 0,
    totalMembers: 0,
    totalCategories: 0,
    totalIssued: 0,
  });

  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const [booksRes, membersRes, categoriesRes, issuedRes] =
        await Promise.all([
          fetch("https://localhost:7036/api/books"),
          fetch("https://localhost:7036/api/Members"),
          fetch("https://localhost:7036/api/Category"),
          fetch("https://localhost:7036/api/issueBook"),
        ]);

      const booksData = await booksRes.json();
      const membersData = await membersRes.json();
      const categoriesData = await categoriesRes.json();
      const issuedData = await issuedRes.json();
setCounts({
        totalBooks: booksData.length || 0,
        totalMembers: membersData.length || 0,
        totalCategories: categoriesData.length || 0,
        totalIssued: issuedData.length || 0,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  fetchCounts();
}, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br      from-indigo-700 via-purple-700 to-blue-800 text-white">

      {/* 🔥 Animated Shapes */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Circle */}
        <div className="absolute w-40 h-40 bg-blue-300/20 rounded-full animate-moveCircle"></div>

        {/* Square */}
        <div className="absolute w-52 h-52 bg-purple-400/20 rounded-2xl animate-moveSquare"></div>

        {/* Extra Shape */}
        <div className="absolute w-32 h-32 bg-white/10 rounded-xl backdrop-blur-md animate-moveSlow"></div>

      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">

        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            Online <span className="text-blue-300">Library</span>
          </h1>

          <p className="mt-6 text-gray-200">
            Manage books, members, and categories easily with your modern Book API system.
          </p>
          <div className="mt-10 w-full">
  <table className="
    w-full 
    text-left 
    border-separate border-spacing-y-3
  ">
    
    {/* Header */}
    <thead>
      <tr className="text-sm uppercase text-gray-300 tracking-wider">
        <th className="px-6 py-3">📚 Books</th>
        <th className="px-6 py-3">👥 Members</th>
        <th className="px-6 py-3">📂 Categories</th>
        <th className="px-6 py-3">📖 Issued</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      <tr className="
        bg-white/10 backdrop-blur-md 
        shadow-lg rounded-xl
        hover:bg-white/20 
        transition duration-300
        text-center text-xl font-semibold
      ">
        <td className="px-6 py-5 rounded-l-xl">
          <span className="text-blue-300">{counts.totalBooks}</span>
        </td>

        <td className="px-6 py-5">
          <span className="text-green-300">{counts.totalMembers}</span>
        </td>

        <td className="px-6 py-5">
          <span className="text-yellow-300">{counts.totalCategories}</span>
        </td>

        <td className="px-6 py-5 rounded-r-xl">
          <span className="text-pink-300">{counts.totalIssued}</span>
        </td>
      </tr>
    </tbody>

  </table>
</div>

      </div>
     </div>
     </div>
  );
}