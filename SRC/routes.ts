import { Router } from "express";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDelivery } from "./middlewares/ensureAuthenticateDeliveryman";

import { AuthenticateClientController } from "./modules/Account/AuthenticateClient/AuthenticateClientControler";
import { AuthenticateDeliverymanController } from "./modules/Account/AuthenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/Clients/useCases/createClient/CreateClientController";
import { FindAllAvailbleController } from "./modules/Deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { CreateDeliveryController } from "./modules/Deliveries/useCases/CreateDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/CreateDeliveryman/CreateDeliverymanController";



const routes = Router();

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const deliveryController = new CreateDeliveryController
const findAllAvailableController = new FindAllAvailbleController()

routes.post("/client/",createClientController.handle);
routes.post("/client/authenticate",authenticateClientController.handle);

routes.post("/deliveryman",createDeliverymanController.handle);
routes.post("/deliveryman/authenticate",authenticateDeliverymanController.handle);
routes.post("/delivery", ensureAuthenticateClient, deliveryController.handle)

routes.get("/delivery/available",ensureAuthenticateDelivery,findAllAvailableController.handle);

export {routes}