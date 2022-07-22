# Warning

I've implemented a terraform code to deploy an API inside a container in ECS, but i had some problems to connect with the RDS (TYPEORM problem). So, i decided to used only a docker based application, and make it work at least locally.

# Running

- To run this project, install docker and docker-compose in the machine.
- After that, just run:

```bash
  docker-compose up -d
```

- Access the API health check at http://localhhost:3000/
