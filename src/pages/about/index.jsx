import Head from 'next/head'
import React from 'react'

const origin = (typeof window === 'undefined') ?  '' : window.location.origin
const description = null
const des2 = 'JASDASM ASDIJSA DASdas mdasd kjasdjasoidjasi'

const description2 = {
    name: des2
}

const index = () => {

    console.log({origin})
  return (
    <>
    <Head>
        {/* <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
        <meta property="og:description" content={description || description2?.name} />
        <meta property="og:image" content={`${origin}/android-chrome-384x384.png`} />

        <title>How to Become an SEO Expert (8 Steps)</title> */}
        <meta name="description" content="Get from SEO newbie to SEO pro in 8 simple steps."/>

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://prueba-metatags.vercel.app/about"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="How to Become an SEO Expert (8 Steps)"/>
        <meta property="og:description" content={description || description2?.name}/>
        <meta property="og:image" content={`${origin}/android-chrome-384x384.png`} />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="prueba-metatags.vercel.app"/>
        <meta property="twitter:url" content="https://prueba-metatags.vercel.app/about"/>
        <meta name="twitter:title" content="How to Become an SEO Expert (8 Steps)"/>
        <meta name="twitter:description" content={description || description2?.name}/>
        <meta name="twitter:image" content={`${origin}/android-chrome-384x384.png`} />
    </Head>
    <div>index</div>
    </>
  )
}

export default index