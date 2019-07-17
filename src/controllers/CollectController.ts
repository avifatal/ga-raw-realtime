import { JsonController, Get, QueryParams } from "routing-controllers";
import { CollectData } from "../models";
import { Topic, PubSub } from "@google-cloud/pubsub";
import { PubSubClient } from "../utils/decorators";



@JsonController()
export class CollectController {

    @Get('/collect')
    async collect(@QueryParams() data: CollectData, @PubSubClient({required: true}) psClient: PubSub){ 
        let result;
        await new Topic(psClient,'request-queue').publish(Buffer.from(JSON.stringify(data))).then(x => result = x).catch(x => result = x);
        return result;
    }


}
