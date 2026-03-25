import Grid from '../../shared/components/grid';
import { Loader } from '../../shared/components/loader';
import { useCategoryQuery } from './queries';

export default function Category() {

  const { data = [], isLoading } = useCategoryQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid<Master.CategoryItem>
      data={data}
      columns={[
        {
          field: 'categoryId',
          header: 'Category Id'
        },
        {
          field: 'categoryName',
          header: 'Category Name'
        }
      ]}
    />
  );
}