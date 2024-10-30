# Study dotnet version of the project

### Docker container for dotnet sdk
set /root to your preferred directory
my PC has dockerportable: knockshore/portable which uses QEMU. dont let windows chkdsk take away the qcow2 file when it finds as bad file.
the dockerhost VM has limited ports exposed, needs 1433 port exposed. edit the boot.bat to expose the port 1433.

```
docker run -it --rm --name dotnetsdk -v /repos/root:/root -v /repos:/rep
os -w /repos mcr.microsoft.com/dotnet/sdk <sh your command: sh|dotnet>
```

### Create new project
```sh
dotnet new webapi -o .
```

### Running the SQL server in background
```sh
docker run -d -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=StrongPass!123" --name studysql -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

### SSMS login
database engine: 127.0.0.1,1433
user: sa
pass: <password>
