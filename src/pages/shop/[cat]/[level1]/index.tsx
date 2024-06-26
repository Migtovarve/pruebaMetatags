import { FC, useEffect, useState } from "react";
import { checkImageSource} from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import CategoryPage from "@/components/Ecommerce/CategoryPage";

const category :any = {
  sku: 'wbe'
}
const product :any = { name: 'ejmplo - ', style:"errings"}

const origin = (typeof window === 'undefined') ?  '' : window.location.origin

const Ppage: FC = () => {

  const [isClient, setIsClient] = useState(false);

  const descriptionTime  = (des:string)=>{
    setTimeout(()=>{
      des = des + "10000"
    }, 10000 )

    return des
  }

  const router = useRouter();

  const { cat } = router?.query;
  const title = product?.name ? `Shop & Customize 
  ${product?.name}${(product?.name?.toLowerCase().includes(product?.style)) ? "" : `${(product?.category?.sku === 'wbe' || product?.category?.sku === 'wbb') ? `, ${product?.style[0].toUpperCase() + product?.style.substring(1)} Style, ` : " " + product?.style[0].toUpperCase() + product?.style.substring(1)}`}
  from our ${product?.category?.name}${product?.category?.name?.toLowerCase().includes('collection') ? '' : ' Collection '} 
  Online | ${(product?.category?.sku === 'wbe') ? `Free Try-on Rings available - ` : ''} Wovemade` : 'Wovemade';
  const description = product?.description ? `Shop Wovemade's
  ${product?.name} ${(product?.name?.toLowerCase().includes(product?.style)) ? "" : `${(product?.category?.sku === 'wbe' || product?.category?.sku === 'wbb') ? `, ${product?.style[0].toUpperCase() + product?.style.substring(1)} Style, ` : " " + product?.style[0].toUpperCase() + product?.style.substring(1)}`}
  from our ${product?.category?.name}${product?.category?.name?.toLowerCase().includes('collection') ? '' : ' Collection'} with your choice of metal. Buy online ${(product?.category?.sku === 'wbe') ? `& experience the convenience of our free try-on rings` : ''}` : 'Wovemade';

  useEffect(() => {
    if (!category?.sku && !product?.name) window.location.assign("/shop");
  }, [cat, category])

  console.log({
    title,
    description

  })

  console.log("3")

  return true ? (
    product?.name ? (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={descriptionTime(description)} />
          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />

          {/* Open Graph */}
          <meta name="description" content={descriptionTime(description)} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="Wove Made" />
          <meta property="og:url" content={`${router.route}`} />
          <meta property="og:description" content={descriptionTime(description)} />
          <meta
            property="og:image"
            content={`${origin}/android-chrome-384x384.png`}
          />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta
            name="twitter:image"
            content={`${origin}/android-chrome-384x384.png`}
          />
        </Head>
        <div>
          product
        </div>
      </>
    ) : (
      <main id="main">
        <div>
          hola mundo 2 
        </div>
        <CategoryPage />
      </main>
    )
  ) : null;
};

export default Ppage;

