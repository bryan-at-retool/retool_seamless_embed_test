import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// this should be an authenticated route
export default async function handler(req, res) {
  // let host = req.body.host; // retool host to login to
  let src = req.body.src; // url to redirect to
  let host = (new URL(src)).origin;
  
  // nonce is used in Retool to prevent replay attacks
  let nonce = crypto.randomBytes(16).toString('base64');

  /* 
    retool_required and metadata objects are typically 
    filled in from lookup to your backend or through 
    verified metadata available in the API request. In
    our example below we are manually filling it in
  */
  const retool_required = {
    external_user_id: 'bw123',
    external_group_id: 'retool',
    retool_groups: ['default_embed', 'customer1'],
    email: 'bryan@retool.com',
    src,
    nonce
  }

  const metadata = {
    my_value1: ['foo','bar'],
    my_value2: 123,
    my_passthrough_jwt: req.headers['X-MY-JWT']
  }

  // create and sign the JWT with an expiration
  const retool_token = jwt.sign(
    {
      ...retool_required,
      ...metadata
    }, 
    process.env.RETOOL_EMBED_SECRET,
    {
      expiresIn: 120
    }
  );
  
  // create the search params
  const search_params = new URLSearchParams({
    _jwt: retool_token,
    src: retool_required.src
  })
  // return the retool login url
  return res.status(200).json({url: `${host}/login/embed?${search_params.toString()}` })
}
