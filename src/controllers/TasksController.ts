import { SCHEMA } from './../utils/schema';
import { JsonController, Get, Res } from "routing-controllers";
import { PubSub } from "@google-cloud/pubsub";
import { PubSubClient, CollectTable, BigQueryClient } from "../utils/decorators";
import {BigQuery, Table} from '@google-cloud/bigquery'
import { APP_CONFIG } from '../app';



@JsonController()
export class TasksController{
    //temp solution
    @Get('/tasks')
    tasks(@Res() response: any){
        response.send(
            '<a href="/tasks/create-topic" target="_blank">create topic</a> <br />'
          + '<a href="/tasks/create-subscription" target="_blank">create subscription</a> <br />'
          + '<a href="/tasks/run-subscription" target="_blank">run subscription</a> <br />'
          + '<a href="/tasks/create-tables" target="_blank">create tables</a> <br />'
          );
    }

    @Get('/tasks/create-subscription')
    createSubscription(@PubSubClient({required: true}) psClient: PubSub) : any{
        let res: any = '';
        psClient.createSubscription(APP_CONFIG.topicName, APP_CONFIG.queueHandlerName).then(success => {
            res = success;
        }).catch(x => res = x);
        return res;
    }

    @Get('/tasks/create-topic')
    async createTopic(@PubSubClient({required: true}) psClient: PubSub) {
        let result: any = '';
        await psClient.createTopic(APP_CONFIG.topicName).catch( x=> result = x).catch(x => result = x);
        return result;
    }

    @Get('/tasks/create-dataset')
    async createDataset(@BigQueryClient() collectTable: BigQuery) {
        let result: any = '';
        collectTable.createDataset(APP_CONFIG.dataSetName);
        return result;
    }

    @Get('/tasks/create-tables')
    async createTables(@BigQueryClient() bigQuery: BigQuery) {
        let result: any = '';
        bigQuery.dataset(APP_CONFIG.dataSetName).createTable(
            APP_CONFIG.collectTableName,
            {friendlyName: APP_CONFIG.collectTableName,schema: SCHEMA, });
        return result;
    }

    @Get('/tasks/run-subscription')
    runSubscription( @PubSubClient() psClient: PubSub) {
        let result: Array<any>[] = [];
        let sub = psClient.subscription(APP_CONFIG.queueHandlerName);
        sub.on('message', message => {
            result.push(message.data.toString());
            console.log(message.data.toString());
            message.ack();
        });
        return result; 
    }   
}