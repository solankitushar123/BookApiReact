import { useNavigate } from 'react-router-dom';
import Grid from '../../../shared/components/grid'; 
import { Loader } from '../../../shared/components/loader';
import { useRemoveBookMutation, useBooksQuery } from '../queries';

export default function GetBook() {
  const navigate = useNavigate();

  const { data = [], isLoading } = useBooksQuery();
  const { isPending, mutateAsync } = useRemoveBookMutation();

  if (isLoading || isPending) {
    return <Loader />;
  }

  if (data.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600">No books found.</p>
        <button 
          onClick={() => navigate('../books')}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700 transition-colors"
        >
          Add First Book
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">Books List</h2>
        <button
          onClick={() => navigate('./create')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-all shadow-md"
        >
          Add Book
        </button>
      </div>

      <Grid<Master.BookItem>
        data={data}
        columns={[
            {field: 'bookId',
            header: 'BookID'
            },
          {
            field: 'bookName',
            header: 'Book Name',
          },
          {
            field: 'author',
            header: 'Author',
          },
          {
            field: 'publishers',
            header: 'Publisher',
          },
          {
             field: 'categoryName',
            header: 'Category Name',
          },
          {
            header: 'Action',
            buttonCaption: 'Delete',
            onClick: async (book) => {
              if (window.confirm("Are you sure you want to delete this book?")) {
                await mutateAsync(book.bookId);
              }
            },
          },
          {
            header: 'Edit',
            buttonCaption: 'Edit',
            onClick: (book) => {
              navigate(`./edit/${book.bookId}`);
            },
          },
        ]}
      />
    </div>
  );
}