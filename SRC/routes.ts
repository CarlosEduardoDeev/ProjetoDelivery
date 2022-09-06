import { Router } from "express";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";

import { AuthenticateClientController } from "./modules/Account/AuthenticateClient/AuthenticateClientControler";
import { AuthenticateDeliverymanController } from "./modules/Account/AuthenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/Clients/useCases/createClient/CreateClientController";
import { FindAllAvailbleController } from "./modules/Deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { CreateDeliveryController } from "./modules/Deliveries/useCases/CreateDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/Deliveryman/useCases/CreateDeliveryman/CreateDeliverymanController";
import { UpdateDeliverymanController } from "./modules/Deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { FindAllDeliveriesController } from "./modules/Clients/useCases/deliveries/findAllDeliveriesController";
import { FindAllDeliveriesDeliverymanController } from "./modules/Deliveryman/useCases/deliveries/findAllDeliveriesDeliverymanController";
import { UpdateEndDateController } from "./modules/Deliveries/useCases/updateEndDate/updateEndDateController";



const routes = Router();

const updateEndDateController = new UpdateEndDateController()
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const deliveryController = new CreateDeliveryController
const findAllAvailableController = new FindAllAvailbleController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController() //

routes.post("/client/",createClientController.handle);
routes.post("/client/authenticate",authenticateClientController.handle);

routes.post("/deliveryman",createDeliverymanController.handle);
routes.post("/deliveryman/authenticate",authenticateDeliverymanController.handle);
routes.post("/delivery", ensureAuthenticateClient, deliveryController.handle)

routes.get("/delivery/available",ensureAuthenticateDeliveryman,findAllAvailableController.handle);

routes.put("/delivery/updateDeliveryman/:id",ensureAuthenticateDeliveryman,updateDeliverymanController.handle)

routes.get("/client/deliveries",ensureAuthenticateClient,findAllDeliveriesController.handle)

routes.get("/deliveryman/deliveries",ensureAuthenticateDeliveryman,findAllDeliveriesDeliverymanController.handle)
routes.put("/delivery/updateEndDate/:id",ensureAuthenticateDeliveryman,updateEndDateController.handle)

export {routes}