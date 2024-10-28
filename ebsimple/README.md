# Elastic Beanstalk Follow Along

## One video is missing

In the Follow Along, the video explaining the Dockerfile creation is missing!!!

Be sure to check [EB-Follow-Along-Docker](https://github.com/ExamProCo/TheFreeAWSDeveloperAssociate/tree/master/EB-Follow-Along-Docker) directory to catch up and finish the section.

```sh
cd /path/to/ebsimple
```

To run postgres
`cd db`
`docker compose up`

To install node modules:

```sh
docker run -it --rm --name nodelts -v .:/ebsimple -p 80:80 -p 8080:8080 -p 9000:9000 -e PORT
=9000 -w /ebsimple node:lts npm i
```

To run the app using docker:
```sh
docker run -it --rm --name nodelts -v .:/ebsimple -p 80:80 -p 8080:8080 -p 9000:9000 -e PORT
=9000 -w /ebsimple node:lts npm start
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
docker run -it --rm -v /repos:/repos --add-host=host.docker.internal:host-gateway postgres:13-alpine bash
```
import schema and seed
```sh
psql postgres://postgres:password@host.docker.internal:5432/app < repos/ebsimple/db/schema.sql
```
```sh
psql postgres://postgres:password@host.docker.internal:5432/app < repos/ebsimple/db/seed.sql
```
refer seed sql file for data


after the postgres is running
```sh
docker run -it --rm --name nodelts -v .:/ebsimple -p 80:80 -p 8080:8080 -p 9000:9000 -e PORT=9000 -e DATABASE_URL=postgres://postgres:password@host.docker.internal:5432/app --add-host=host.docker.internal:host-gateway -w /ebsimple node:lts npm start
```
using nodemon
```sh
docker run -it --rm --name nodelts -v .:/ebsimple -p 80:80 -p 8080:8080 -p 9000:9000 -e PORT=9000 -e DATABASE_URL=postgres://postgres:password@host.docker.internal:5432/app --add-host=host.docker.internal:host-gateway -w /ebsimple node:lts ./node_modules/.bin/nodemon --watch
```

# Install EB CLI

https://github.com/aws/aws-elastic-beanstalk-cli-setup

prepare python docker to create ebcli container
```
docker run -it -v /:/host --name ebcli python bash
```

Use knockshore/ebcli for simplicity

echo 'export PATH="/root/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile

# Run EB CLI docker image

```sh
docker run -it -v /:/host --name ebcli knockshore/ebcli:3.21 bash
```

# initialize EB
```sh
eb init
```
- Select region
- Select NodeJS
- Select Node 20 running on Amazon Linux 2023
- Continue with out Code Commit

Set code source
```
eb codesource
```
Select Codecommit

```sh
mkdir .ebextensions
touch .ebextensions/000_envars.config
```
```
git remote add origin git@github.com:knockshore/ebsimple.git
git push --set-upstream origin master
```

# Run eb create

```
eb create --single
```

Error autoscaling config

https://github.com/aws/aws-elastic-beanstalk-cli/issues/525

```yaml
option_settings:
  aws:autoscaling:launchconfiguration:
    DisableIMDSv1: true
```