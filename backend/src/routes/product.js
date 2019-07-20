import passport from 'passport';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product';

function setupProductRoutes(router) {
  // GET -- List Products
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    getProducts
  );

  // POST -- Create Product
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    createProduct
  );

  // PUT -- Update Product
  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    updateProduct
  );

  // DELETE -- Delete Product
  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    deleteProduct
  );
}

export default setupProductRoutes;
