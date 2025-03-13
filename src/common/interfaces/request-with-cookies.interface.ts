import { Request } from 'express';

interface RequestWithCookies extends Request {
  cookies: {
    _token?: string;
    [key: string]: string | undefined;
  };
}

export default RequestWithCookies;
