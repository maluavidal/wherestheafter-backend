import jwt from 'jsonwebtoken';
import { User } from '../models';

const tokenVerify = async (req, res, next) => {
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
	  logging: true,
	  paranoid: false,
	  attributes: ['id', 'email', 'is_admin'],
	  raw: true
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
}

const isProducer = (req, res, next) => {
	if (req.userInfo.is_admin || req.params.id === req.userInfo.id) {
		next();
	} else {
		return res.status(401).json({
			errors: ['Access denied.'],
		  });
	}
}

const isAdmin = (req, res, next) => {
	if (req.userInfo.is_admin) {
		next();
	} else {
		return res.status(401).json({
			errors: ['Access denied.'],
		  });
	}
}

export {
	tokenVerify,
	isAdmin,
	isProducer
}
