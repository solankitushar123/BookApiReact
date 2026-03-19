import { useEffect } from 'react'
import { useState } from 'react';
import { Loader } from '../../shared/components/loader';
import { ApiService } from '../../services';
import Grid from '../../shared/components/grid';
interface IssuedBook {
  bookId: number;
  bookName: string;
  memberName: string;
  memberId: number;
  issueDate: string;
  returnDate?: string | null;
  renewDate?: string | null;
}
export default function IssuedBooks() {
     const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
    ApiService.get<IssuedBook[]>("issueBook")
      .then(data => setIssuedBooks(data))
      .then(() => setIsLoading(false));
  }, []);


  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Issued Books</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
            <Grid<IssuedBook> data={issuedBooks} />
        )}
    </div>
  )
}
