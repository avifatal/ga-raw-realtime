import { TasksController } from './controllers/TasksController';
const PORT = Number(process.env.PORT) || 8090;
import * as express from "express";
import {PubSub, Topic, Message}  from '@google-cloud/pubsub'
import * as bodyParser from "body-parser";
import { useExpressServer, createParamDecorator } from "routing-controllers";
import { CollectController } from "./controllers/CollectController";
import 'reflect-metadata'


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
useExpressServer(app, {
   controllers: [CollectController, TasksController]
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
