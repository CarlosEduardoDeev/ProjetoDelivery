import { Router } from "express";
import { AuthenticateClientController } from "./modules/Account/AuthenticateClient/AuthenticateClientControler";
import { AuthenticateDeliverymanController } from "./modules/Account/AuthenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/Clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/Deliveries/useCases/CreateDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/CreateDeliveryman/CreateDeliverymanController";



const routes = Router();

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const deliveryController = new CreateDeliveryController

routes.post("/client/",createClientController.handle);
routes.post("/client/authenticate",authenticateClientController.handle);

routes.post("/deliveryman",createDeliverymanController.handle);
routes.post("/deliveryman/authenticate",authenticateDeliverymanController.handle);
routes.post("/delivery", deliveryController.handle)

export {routes}