import { User } from '@modules/database/entities';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
