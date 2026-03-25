import Form from "../components/Form";
import { useNewBookMutation } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewBookMutation();

  return (
    <Form
      submitCaption="Create" 
      onSubmit={async (book) => {
        try {
          await mutateAsync(book);
          window.history.back(); 
        } catch (error) {
          console.error("Failed to create book:", error);
        }
      }}
    />
  );
}