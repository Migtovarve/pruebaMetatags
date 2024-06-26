import Head from 'next/head'
import React from 'react'

const origin = (typeof window === 'undefined') ?  '' : window.location.origin

const index = () => {

    console.log({origin})
  return (
    <>
    <Head>
        <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
        <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
        <meta property="og:image" content={`${origin}/img/android-chrome-384x384.png`} />
    </Head>
    <div>index</div>
    </>
  )
}

export default index