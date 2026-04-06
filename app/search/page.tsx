import { Metadata } from "next";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/store";

export const metadata: Metadata = {
  title: "Busca",
  description: "Busque por produtos na loja.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "Não foram encontrados produtos que correspondam a "
            : `Mostrando ${products.length} ${resultsText} para `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
