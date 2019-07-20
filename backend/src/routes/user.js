import passport from 'passport';
import { register, login, currentUser } from '../controllers/user';

function setupUserRoutes(router) {
  router.post('/register', register);
  router.post('/login', login);
  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    currentUser
  );
}

export default setupUserRoutes;
