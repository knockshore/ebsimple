# Elastic Beanstalk Follow Along

## One video is missing

In the Follow Along, the video explaining the Dockerfile creation is missing!!!

Be sure to check [EB-Follow-Along-Docker](https://github.com/ExamProCo/TheFreeAWSDeveloperAssociate/tree/master/EB-Follow-Along-Docker) directory to catch up and finish the section.


To run postgres
`cd db`
`docker compose up`

To install node modules:

```sh
docker run -it --rm --name nodelts -v .:/ebsimple -p 80:80 -p 8080:8080 -p 3000:3000 -e PORT
=3000 -w /ebsimple node:lts npm i
```

To run the app using docker:
```sh
docker run -it --rm --name nodelts -v .:/ebsimple -p 80:80 -p 8080:8080 -p 3000:3000 -e PORT
=3000 -w /ebsimple node:lts npm start
```

To connect to postgres server running in docker and pg port exposed to host
```sh
docker run -it --rm --add-host=host.docker.internal:host-gateway postgres:13-alpine psql -h host.docker.internal -U postgres
```

Create initial database 

```sh
createdb app -h host.docker.internal -U postgres
```
docker
```sh
docker run -it --rm --add-host=host.docker.internal:host-gateway postgres:13-alpine createdb app -h host.docker.internal -U postgres
```

Connect to created db
```sh
docker run -it --rm --add-host=host.docker.internal:host-gateway postgres:13-alpine psql postgres://postgres:password@host.docker.internal:5432/app
```

create tables

open postgres client from docker
```sh
docker run -it --rm -v /repos:/repos --add-host=host.docker.internal:host-
gateway postgres:13-alpine bash
```
import schema and seed
```sh
psql postgres://postgres:password@host.docker.internal:5432/app < repos/ebsimple/db/schema.sql
```
```sh
psql postgres://postgres:password@host.docker.internal:5432/app < repos/ebsimple/db/seed.sql
```
refer seed sql file for data