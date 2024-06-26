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
        <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
        <meta property="og:description" content={description || description2?.name} />
        <meta property="og:image" content={`${origin}/android-chrome-384x384.png`} />
    </Head>
    <div>index</div>
    </>
  )
}

export default index