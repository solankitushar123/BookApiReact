import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { useUpdateBookMutation, useBooksQuery } from "../queries";

export default function Edit() {

  const { id } = useParams();
  const bookId = Number(id);

  // get single book
   const { data: books = [] } = useBooksQuery();
  const book = books.find((b: Master.BookItem) => b.bookId === bookId);

  // pass id to mutation hook
  const { mutateAsync } = useUpdateBookMutation(bookId);

  return (
    <Form
      submitCaption="Update"
      
      // load existing values in form
      onLoad={async () => {
        return book!;
      }}

      // submit updated data
      onSubmit={async (book) => {
        await mutateAsync(book);
      }}
    />
  );
}