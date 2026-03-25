import { Route, Routes } from 'react-router-dom';
import Create from './createBook'; 
import Edit from './UpdateBook';    
import GetBook from './getBook';

export default function Books() {
  return (

    <div className="flex justify-center items-center min-h-[80vh]">
      
      <Routes>

        {/* GET /books */}
        <Route index element={<GetBook />} />

        {/* GET /books/create */}
        <Route path="create" element={<Create />} />

        {/* GET /books/edit/1 */}
        <Route path="edit/:id" element={<Edit />} />

      </Routes>

    </div>
  );
}