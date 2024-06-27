import { fallbackRestUrl } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";


const origin = (typeof window === 'undefined') ?  '' : window.location.origin

const category: any = {
  name: "SI SE PUEDE "
}
const variants: any = {}

const CategoryPage: FC = () => {


  const router = useRouter();

  console.log("3")

  const detail = { ...category };
  const { cat, level1 } = router?.query;

  const title = "TITULO"
  const variantType = {
    description: null
  }

  return (
    <div>
      <Head>
        {detail ? <title>{title}</title> : <title>404 | Wove Made</title>}
        <meta name="description" content={variantType?.description || detail?.name || category?.name} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={`${fallbackRestUrl}${router?.asPath}`}
          key="ogurl"
        />
        <meta
          property="og:site_name"
          content={title}
          key="ogsitename"
        />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={variantType?.description || detail?.name || category?.name} key="ogdesc"  />
        <meta property="og:description" content={""} key="ogdesc" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${origin}/android-chrome-384x384.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={variantType?.description || detail?.name || category?.name} />
        <meta name="twitter:image" content={`${origin}/android-chrome-384x384.png`} />
      </Head>
      {detail !== undefined ? (
        <div>
          <div>hola mundo</div>
        </div>
      ) : (
        <div>
          ERROR
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
