import { BigQuery } from '@google-cloud/bigquery';
import { createParamDecorator } from "routing-controllers";
import { PubSub } from "@google-cloud/pubsub";
import { APP_CONFIG } from '../app';


let gcpOptions = {projectId: 'tracking-245506', keyFilename: 'keyfile.json'}

export function PubSubClient(options?: {required : boolean}) {
    return createParamDecorator({
       value : action => new PubSub(gcpOptions),
       required: options ? options.required : false
   });
}

export function CollectTable(options?: {required : boolean}) {
    console.log(APP_CONFIG);
    return createParamDecorator({
       value : action => new BigQuery(gcpOptions).dataset(APP_CONFIG.dataSetName).table(APP_CONFIG.collectTableName),
       required: options ? options.required : false
   });
}
 
export function BigQueryClient(options?: {required : boolean}) {
    return createParamDecorator({
       value : action => new BigQuery(gcpOptions),
       required: options ? options.required : false
   });
}
