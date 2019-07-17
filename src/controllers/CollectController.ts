import { JsonController, Get, QueryParams } from "routing-controllers";
import { CollectData } from "../models";
import { Topic, PubSub } from "@google-cloud/pubsub";
import { PubSubClient } from "../utils/decorators";
import { APP_CONFIG } from "../app";



@JsonController()
export class CollectController {

    @Get('/collect')
    async collect(@QueryParams() data: CollectData, @PubSubClient({required: true}) psClient: PubSub){ 
        let result;
        await new Topic(psClient,APP_CONFIG.topicName).publish(Buffer.from(JSON.stringify(data))).then(x => result = x).catch(x => result = x);
        return result;
    }


}
