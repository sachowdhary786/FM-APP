import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models/user.model";

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
  // eslint-disable-next-line no-unused-vars
  deserializeUser: (req: NextApiRequest, res: NextApiResponse) => Promise<User | undefined>;
};