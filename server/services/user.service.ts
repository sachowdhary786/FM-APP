import { setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import errorHandler from '../contollers/error.controller';
import deserializeUser from '../middleware/deserializeUser';
import { LoginInput } from '../schemas/user.schema';
import UserModel, { User } from '../models/user.model';
import { Context } from '../types/context';
import { disconnectDB } from '../utils/connectDB';
import redisClient from '../utils/connectRedis';
import { signJwt, verifyJwt } from '../utils/jwt';

const accessTokenExpiresIn = 15;
const refreshTokenExpiresIn = 60;

const cookieOptions: OptionsType = {
  httpOnly: true,
  // domain: '/'.
  sameSite: 'lax',
  // secure: true
}

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: accessTokenExpiresIn * 60,
  expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000)
};

const refresTokenCookieOptions = {
  ...cookieOptions,
  maxAge: refreshTokenExpiresIn * 60,
  expires: new Date(Date.now() + refreshTokenExpiresIn * 60 * 1000)
};

async function findByEmail(email: string): Promise<User | null> {
  return UserModel.findOne({ email }).select('+password');
}

function signTokens(user: User) {
  const userId: string = user._id.toString();
  const access_token = signJwt({ userId }, 'accessTokenPrivateKey', {
    expiresIn: `${accessTokenExpiresIn}m`
  })
  const refresh_token = signJwt({ userId }, 'refreshTokenPrivateKey', {
    expiresIn: `${refreshTokenExpiresIn}m`
  })

  redisClient.set(userId, JSON.stringify(user), {
    EX: refreshTokenExpiresIn * 60
  });

  return { access_token, refresh_token }
}

export default class UserService {
  // Sign up a new user
  async signUpUser(input: Partial<User>) {
    try {
      const user = await UserModel.create(input);
      await disconnectDB();
      return {
        status: 'success',
        user: user.toJSON(),
      }
    } catch (error: any) {
      // if (error.code === 11000) {
      //   return new ForbiddenError('Email already exists')
      // }
      errorHandler(error);
    }
  }

  // Login an existing user
  async loginUser(input: LoginInput, { req, res }: Context) {
    try {
      // const message = 'Invalid email or password';
      // Step 1: Find user by email 
      const user = await findByEmail(input.email);
      await disconnectDB();

      // if (!user) {
      //   return new AuthenticationError(message);
      // }
      // Step 2: Compare the inputted password with the stored one
      // if (!(await UserModel.comparePasswords(user.password, input.password))) {
      //   return new AuthenticationError(message);
      // }

      // Step 3: Sign JWT Tokens
      const { access_token, refresh_token } = signTokens(user);

      //Step 4: Add Tokens to Context
      setCookie('access_token', access_token, {
        req, res, ...accessTokenCookieOptions
      });
      setCookie('refresh_token', refresh_token, {
        req, res, ...refresTokenCookieOptions
      });
      setCookie('logged_in', 'true', {
        req, res, ...accessTokenCookieOptions, httpOnly: false
      })
      return {
        status: 'success', access_token
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  // Get authenticated User
  async getMe({ req, res, deserializeUser }: Context) {
    try {
      const user = await deserializeUser(req, res)
      return {
        status: 'success',
        user: {
          ...user,
          id: user?._id
        }
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  //Refresh the Access Token
  async refreshAccessToken({ req, res }: Context) {
    try {
      // Get the refresh token
      const { refresh_token } = req.cookies;

      // if (!refresh_token) {
      //   throw new ForbiddenError('Could not refresh the access token');
      // }

      const decoded = verifyJwt<{ userId: string }>(
        refresh_token,
        'refreshTokenPublicKey'
      );

      // if (!decoded) {
      //   throw new ForbiddenError('Could not refresh the access token');
      // }

      //Check if the users session is still valid 
      const session = await redisClient.get(decoded.userId);

      // if (!session) {
      //   throw new ForbiddenError('User session has expired');
      // }

      // Check if the user exists and is verified
      const user = await UserModel.findById(JSON.parse(session)._id).select(
        '+verified'
      );
      await disconnectDB();

      // if (!user || !user.verified) {
      //   throw new ForbiddenError('Could not refresh the access token. User does not exist or is not verified')
      // }

      // Sign a new access token
      const access_token = signJwt(
        { userId: user._id },
        'accessTokenPrivateKey',
        {
          expiresIn: `${accessTokenExpiresIn}m`
        }
      );

      // Send access token cookie
      setCookie('access_token', access_token, {
        req, res, ...accessTokenCookieOptions
      });
      setCookie('logged_in', 'true', {
        req, res, ...accessTokenCookieOptions, httpOnly: false
      });

      return {
        status: 'success',
        access_token
      }

    } catch (error) {
      errorHandler(error);
    }
  }

  // Logout the User
  async logoutUser({ req, res }: Context) {
    try {
      const user = await deserializeUser(req, res);

      // Delete the users session
      await redisClient.del(String(user?._id));

      // Logout the user
      setCookie('access_token', '', { req, res, maxAge: -1 });
      setCookie('refresh_token', '', { req, res, maxAge: -1 });
      setCookie('logged_in', '', { req, res, maxAge: -1 });

      return true;
    } catch (error) {
      errorHandler(error);
    }
  }
}

