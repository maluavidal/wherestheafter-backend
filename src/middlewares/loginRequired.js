import jwt from 'jsonwebtoken';
import { User } from '../models';
import bcryptjs from 'bcrypt';

export default async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({
		errors: ['Login required.'],
		});
	}

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
		deleted_at: null
      },
	  paranoid: false,
	  attributes: ['id', 'name', 'email', 'is_admin', 'is_event_manager']
    });

    if (!user) {
      return res.status(401).json({
        errors: ['User is not valid.'],
      });
    }

    req.userInfo = user;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Expired or invalid token.'],
    });
  }
};
