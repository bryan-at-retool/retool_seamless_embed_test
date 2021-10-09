import {useState} from 'react';
export default function Form ({setUrl}) {
  const [src, setSrc] = useState('https://example.retool.com/apps/');
  const handleSubmit = async () => {
    const new_url = new URL(src)
    const resp = await fetch('/api/login/retool', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        src,
        // host: new_url.origin
      })
    })
    const data = await resp.json();
    setUrl(data.url)
  }
  return <div style={{width: '100vw'}}>
    <label>
      Full Retool URL
      <input  style={{width: '70%'}} value={src} onChange={(e)=>setSrc(e.target.value)} />
    </label>
    <input type="submit" value="Submit" onClick={handleSubmit} />
  </div>
}