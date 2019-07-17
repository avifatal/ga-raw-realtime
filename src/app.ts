import { TasksController } from './controllers/TasksController';
import * as express from "express";
import {PubSub, Topic, Message}  from '@google-cloud/pubsub'
import * as bodyParser from "body-parser";
import { useExpressServer, createParamDecorator } from "routing-controllers";
import { CollectController } from "./controllers/CollectController";
import 'reflect-metadata'
import * as dotenv from 'dotenv'
import { AppConfig } from './models';
dotenv.config();


export const APP_CONFIG : AppConfig = {
  port: Number(process.env.PORT),
  collectTableName: process.env.COLLECT_TABLE_NAME,
  dataSetName: process.env.DATA_SET_NAME,
  topicName: process.env.TOPIC_NAME,
  queueHandlerName: process.env.QUEUE_HANDLER_NAME
}
console.log(APP_CONFIG);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
useExpressServer(app, {
   controllers: [CollectController, TasksController]
});

 
app.listen(APP_CONFIG.port, () => {
  console.log(process.env.NAME_NAME); 
});
