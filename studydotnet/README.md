# Study dotnet version of the project

### Docker container for dotnet sdk
set /root to your preferred directory
my PC has dockerportable: knockshore/portable which uses QEMU. dont let windows chkdsk take away the qcow2 file when it finds as bad file.
the dockerhost VM has limited ports exposed, needs 1433 port exposed. edit the boot.bat to expose the port 1433.

```sh
docker run -it --rm --name dotnetsdk -v /repos/root:/root -v /repos:/repos -w /repos mcr.microsoft.com/dotnet/sdk <sh your command: sh|dotnet>
```

### Create new project
```sh
dotnet new webapi -o .
```

### Running the SQL server in background
```sh
docker run -d --rm -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=StrongPass!123" -v /repos/root/mssql:/var/opt/mssql --name studysql -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

### SSMS login
database engine: 127.0.0.1,1433
user: sa
pass: <password>

- Execute schema and seed db SQL commands
```sh
sqlcmd < schema.sql
sqlcmd < seed.sql
```

### Add deps
```sh
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.AspNetCore.StaticFiles
```

Run
```sh
docker run -it --rm --name dotnetsdk --add-host=host.docker.internal:host-gateway -e "DBCONNECTIONSTRING=Server=host.docker.internal,1433;Database=studyapp;User ID=sa;Password=StrongPass!123;TrustServerCertificate=true" -v /repos/root:/root -v /repos:/repos -p 8080:8080 -w /repos/aws-dva-c02/studydotnet mcr.microsoft.com/dotnet/sdk dotnet watch
```
If running dotnet in local using docker mssql:
```cmd
set "DBCONNECTIONSTRING=Server=localhost,1433;Database=studyapp;User ID=sa;Password=StrongPass!123;TrustServerCertificate=true"
```
```powershell
[System.Environment]::SetEnvironmentVariable("DBCONNECTIONSTRING","Server=localhost,1433;Database=studyapp;User ID=sa;Password=StrongPass!123;TrustServerCertificate=true")
```
```
export "DBCONNECTIONSTRING=Server=host.docker.internal,1433;Database=studyapp;User ID=sa;Password=StrongPass!123;TrustServerCertificate=true"
```

NOTE: The dotnet run serves with 127.0.0.1 localhost address for default projects. Use 0.0.0.0 as binding address so that the docker host and VM host can expose traffic from the container.

