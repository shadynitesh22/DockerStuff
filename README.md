# DockerInvoice();

The invoice appilcation is dockerized so you can run both frontend and backend without having to install any dependencies in your system.

## To run the application have docker installed in your system.

Clone the git repo 
```
git clone git@github.com:shadynitesh22/DockerInvoice.git
```

1. From the root(where the docker-compose.yml file located)

2. Build Docker(This will build docker 🏭 ):
```
sudo docker-compose build 
```
3. To run docker build(will run docker images.👆 ):
```
sudo docker-compose up 
```
4. If you want to do both steps at the same time 😮 you can also do: 
```
sudo docker-compose up --build
```
5. If you want to stop any instaces of docker images🛑:
```
sudo docker-compose down
```

<sub>note : sudo is used only for permission🔒 adjust to your requirements.</sub>
