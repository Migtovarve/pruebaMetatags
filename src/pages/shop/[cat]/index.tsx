
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryPage from "@/components/Ecommerce/CategoryPage";


const category :any = {}
const Categories: FC = () => {
  const router = useRouter();
  const { cat } = router?.query;


  console.log("2")

  useEffect(() => {
    // if (!category?.sku) window.location.assign("/shop");
  }, [cat, category]);

  return  (
    <main id="main">
      <CategoryPage />
    </main>
  ) 
};

export default Categories;
