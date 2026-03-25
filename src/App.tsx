import "./App.css";
import logo from "./assets/logo/logo.png";
import Home from "./features/Home";
import { Link, Route, Routes } from "react-router-dom";
import Books from "./features/Books";
import Category from "./features/Category";
import Members from "./features/Members/Index";
import IssuedBooks from "./features/IssuedBooks/Index";
import {Button} from "./shared/components/button";

function App() {
  return (
   <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900 text-white">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
         <Link to="/" className="flex items-center gap-3">
  <img
    src={logo}
    alt="Library Logo"
    className="
      h-10 w-10 
      object-contain 
      rounded-xl
      drop-shadow-[0_0_10px_rgba(255,100,255,0.6)]
    "
  />
  
  <span className="text-2xl font-bold tracking-wide text-white">
    Library App
  </span>
</Link>

            {/* Navigation Links */}
          <div className="flex gap-4 font-medium">
            
            {[
              { to: "/books", label: "Books" },
              { to: "/Category", label: "Categories" },
              { to: "/Member", label: "Members" },
              { to: "/IssueBook", label: "Issued Books" },
            ].map((item) => (
               <Link
    key={item.to}
    to={item.to}
    
  >
    <Button caption={item.label} /> 
  </Link>
            ))}

          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/books/*" element={<Books />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Member" element={<Members />} />
          <Route path="/IssueBook" element={<IssuedBooks />} />
        </Routes>
      </div>
<footer className="py-4 mt-auto text-center text-sm text-white/70 border-t border-white/20 bg-white/10 backdrop-blur-md">
  © {new Date().getFullYear()} Library App • Built with React
</footer>
    </div>
  );
}

export default App;