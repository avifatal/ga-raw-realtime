import { JsonController, Get, Res } from "routing-controllers";
import { PubSub } from "@google-cloud/pubsub";
import { PubSubClient } from "../utils/decorators";



@JsonController()
export class TasksController{

    @Get('/tasks')
    tasks(@Res() response: any){
        response.send(
            '<a href="/tasks/create-topic" target="_blank">create topic</a> <br />'
          + '<a href="/tasks/create-subscription" target="_blank">create subscription</a> <br />'
          + '<a href="/tasks/run-subscription" target="_blank">run subscription</a> <br />'
          );
    }

    @Get('/tasks/create-subscription')
    createSubscription(@PubSubClient({required: true}) psClient: PubSub) : any{
        let res: any = '';
        psClient.createSubscription('request-queue', 'node-request-queue-handler').then(success => {
            res = success;
        }).catch(x => res = x);
        return res;
    }

    @Get('/tasks/create-topic')
    async createTopic(@PubSubClient({required: true}) psClient: PubSub) {
        let result: any = '';
        await psClient.createTopic('request-queue').catch( x=> result = x).catch(x => result = x);
        return result;
    }

    @Get('/tasks/run-subscription')
    runSubscription( @PubSubClient() psClient: PubSub) {
        let result: Array<any>[] = [];
        let sub = psClient.subscription('node-request-queue-handler');
        sub.on('message', message => {
            result.push(message.data.toString());
            console.log(message.data.toString());
            message.ack();
        });
        return result; 
    }   
}