// This will serve as an authentication guard for all protected routes in the app

// import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasCookie, getCookie } from 'cookies-next';
import UserModel from '../models/user.model';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';
import { disconnectDB } from '../utils/connectDB';

const deserializeUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (hasCookie('access token', { req, res })) {
      access_token = getCookie('access_token', { req, res });
    }

    // if (!access_token) throw new AuthenticationError('No access token found')
    // Verify the Access Token
    const decoded = verifyJwt<{ userId: string }>(
      String(access_token), 'accessTokenPublicKey'
    );

    // if (!decoded) throw new AuthenticationError('Invalid access Token');

    // Check if the session is valid
    const session = await redisClient.get(decoded.userId);

    // if (!session) throw new ForbiddenError('Session has expired');

    // Check if the user exists or not
    const user = await UserModel.findById(JSON.parse(session)._id).select('+verified').lean(true);
    await disconnectDB();

    if (!user || !user.verified) {
      // throw new ForbiddenError('The user belonging to this token no longer exists')
    }
    return user;
  } catch (error: any) {
    throw new error;
  }
}

export default deserializeUser;