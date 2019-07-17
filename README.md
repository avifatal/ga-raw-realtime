# Google Analytics -> BigQuery streaming raw data in nearly real-time

This project aims to provide realtime, row-level raw data Google Analytics data to Google Bigquery.

## The problem?
- Google provides sampled and aggregated data and Google analytics.
- Google sync its data every 24-48 hours.
- You can't actually query the data and extract meaningful information besides build-in reports (or, you can query the sampled data).
- You can't cross join Google Analytics data with other data sources in your organization.


## The solution
The system intercepts all Google Analytics requests from the client-side and submits them to NodeJS app deployed to app engine.
The app streams the data to async-ly to google Bigquery which suppose to solve all the problems mentioned above.
One of the biggest benefits is actually to allow you to develop your reports and dashboards on-top of Google Data Studio and then cross join other data sources. 

## Status
The project right now is in its initial state and shopping around for features scope technological solution.
For now, the entire stack will be deployed in Google Cloud Platform   

## Inspired by:
[https://github.com/lnklnklnk/ga-bq](https://github.com/lnklnklnk/ga-bq)  
[https://www.owox.com/products/bi/pipeline/google-analytics-to-google-bigquery-streaming/#all-questions](https://www.owox.com/products/bi/pipeline/google-analytics-to-google-bigquery-streaming/#all-questions)
