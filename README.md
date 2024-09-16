# Sample Screener Project

### Front end

[Application Link](https://whispering-inlet-60247-1a7603144b1a.herokuapp.com/)

[Github Project Link](https://github.com/jfiorato/bp-screener-web)

### API
[Github Project Link](https://github.com/jfiorato/bp-screener-api)

Host: https://thawing-savannah-66031-0c3d29d73cd6.herokuapp.com/

#### Question Domain Endpoints:
* `GET /question-domains` - Fetches question domains
* `POST /question-domains` - Creates a question/domain combination w/ a body of `{ question_id: "question_a", domain: "anxiety"}`
* `GET /question-domains/:id` - Fetches a question domain by question id
* `DELETE /question-domains/:id` - Destroys a question domain by question id

#### Screener Endpoints
* `GET /screeners/:id` - Fetches the screener questionaire by id
* `POST /screeners` - Submits the screener results and returns the answer

## Description
This project creates an example diagnostic screener that is similar to standardized screeners that the Blueprint may provide customers. The screener asks the patient a series of questions and results in determination of the Level-2 assessment that should follow.

This project uses a Reactjs front end and a Nestjs Node backend to accomplish the desired functionality. For storing data it uses a Postgres database. Both the front end and API are deployed to and hosted on Heroku.

## Tech Thoughts
Given the time constraints of the project, it was important to choose frameworks that would allow me to move quickly and deliver the requirements. Nestjs provides a very simple and opinionated way to create API backends, and Reactjs is the "go to" option for managing state between multiple steps required by this problem. I chose Material UI for the front end design to get to a pleasing interface quickly.

Also, it was important that the frameworks I used were simple and weren't filled with too many dependencies or supported functionality that was unnecessary. A couple examples:
* `typeorm` as the ORM layer and simple database integration.
* `zustand` as a simple state management framework for the front end

I chose Heroku for hosting the project because it is easy and quick to deploy these projects to, and it makes it much simpler to provide the working project to others.

## Productionalization
First, I would write unit tests to increase coverage in key areas of the application.

If I were to deploy this as a true production application on a platform of *my* choice, for the front end, I would choose S3 and Cloudfront. This combination offers extremely resilient front end hosting and edge-cached content. For the API I would host using AWS ECS Fargate behind a AWS ALB. ECS and ALB allows for multiple load-balanced API instances to run for resiliency and scale as needed. Fargate's serverless infrastructure eliminates the need for managing the EC2 hosts. The database would be hosted using AWS RDS Aurora cluster, which provides a resilient database backend, and allows for scaling in the future if needed.

At a minimum, the API and RDS cluster would run in a private subnet within an AWS VPC. The AWS ALB would be the only publicly exposed endpoint in the architecture. A public SSL certificate would encrypt traffic between the browser and the front end and API. For the API, SSL certificate would be terminated at the ALB and a new SSL connection using AWS KMS would be used to encrypt traffic between the ALB and the ECS tasks. Traffic between ECS and RDS would also be encrypted by SSL.

For observability in the API, I would use AWS CloudWatch logging from the ECS tasks, and stream those logs to OpenSearch for reporting and troubleshooting in Kibana. For the front end, I would use Bugsnag for client-side error logging, and CloudWatch RUM for monitoring performance. I would configure CloudWatch alarms to monitor infrastructure health (RDS key metrics such as, CPU, memory, IOPS/ECS task health), as well as logs for server errors and other key indicators of application health.

All infrastructure, configuration, monitoring, and alarms would be created in code using AWS CDK. I would setup CircleCI for continuous integration and continuous deployment of the application.

I would ensure the database could evolve using schema migrations, rather than TypeORM schema synchronization. Additionally I would add API versioning using Nestjs versioning functionality to more easily allow the API to evolve independently of the front end.

## Improvements
Unit testing was the biggest tradeoff I made as part of this project. I chose to skip unit tests to complete the  requirements of the project in a reasonable amount of time. However, I feel strongly that unit tests are a pretty critical part of the development workflow from the start.

Due to time constraints, I also made the assumption that there would only ever be one section element in the questions schema. I did this as there was only one section in the sample schema, and it saved a little bit of time on implementation.

If I had some more time to spend, I would spend some more time cleaning up the React code. I feel like the components could be organized a bit better, and the state could be refactored to be simpler.

## LinkedIn
https://www.linkedin.com/in/jfiorato
