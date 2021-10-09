import Head from 'next/head'
import Form from '../components/Form'
import {useEffect, useState} from 'react';
import Retool from 'react-retool';

export default function Home() {
  const [url, setUrl] = useState('')
  return (
    <div>
      <Head>
        <title>Retool Seamless Embed Example</title>
        <meta name="description" content="Retool Seamless Embed Example" />
        <link rel="icon" href="https://retool.com/favicon.png" />
      </Head>
      <div style={{height: '25vh'}}>
        <Form {...{setUrl}} />
        <div>Signed Url: {url}</div>
      </div>
      <div style={{height: '75vh'}}>
      { 
        url.length ? 
        <Retool url={url}></Retool>
        : <></>
      }
      </div>
    </div>
  )
}
