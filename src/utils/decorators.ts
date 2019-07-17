import { createParamDecorator } from "routing-controllers";
import { PubSub } from "@google-cloud/pubsub";

export function PubSubClient(options?: {required : boolean}) {
    return createParamDecorator({
       value : action => new PubSub({projectId: 'tracking-245506', keyFilename: 'keyfile.json'}),
       required: options ? options.required : false
   });
}