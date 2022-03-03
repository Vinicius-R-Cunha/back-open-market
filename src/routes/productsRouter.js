import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const productsRouter = Router();

productsRouter.use(validateTokenMiddleware);

productsRouter.get('/products',);
productsRouter.post('/products',);
productsRouter.put('/products/:idProduct',);
productsRouter.delete('/products/:idProduct',);

export default productsRouter;