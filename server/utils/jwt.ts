import jwt, { SignOptions } from 'jsonwebtoken';

export const signJwt = (
  payload: Object,
  keyname: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: SignOptions
) => {
  const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY as String;
  const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as String;

  let privateKey = '';
  if (keyname === 'accessTokenPrivateKey') {
    privateKey = Buffer.from(accessTokenPrivateKey, 'base64').toString('ascii')
  } else if (keyname === 'refreshTokenPrivateKey') {
    privateKey = Buffer.from(refreshTokenPrivateKey, 'base64').toString('ascii');
  }

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export const verifyJwt = <T>(
  token: string,
  keyname: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  let publicKey = '';
  const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;
  const refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY as string;

  if (keyname === 'accessTokenPublicKey') {
    publicKey = Buffer.from(accessTokenPublicKey, 'base64').toString('ascii')
  } else if (keyname === 'refreshTokenPublicKey') {
    publicKey = Buffer.from(refreshTokenPublicKey, 'base64').toString('ascii')
  }

  try {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as T;
  } catch (error) {
    return null;
  }
}