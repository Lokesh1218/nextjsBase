import Head from 'next/head';

const PageHead = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      { props.description &&
        <meta name="description" content={props.description}/>
      }
      { props.ogDescription &&
        <meta property="og:description" content={props.ogDescription} />
      }
      { props.ogTitle && 
        <meta property="og:title" content={props.ogTitle} />
      }
      {
        props.ogSiteName &&
        <meta property="og:site_name" content={props.ogSiteName} />
      }
      {
        props.ogUrl &&
        <meta property="og:url" content={props.ogUrl} />
      }
    </Head>
  )
}

export default PageHead;