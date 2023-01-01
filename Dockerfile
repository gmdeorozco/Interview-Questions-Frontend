FROM openjdk:latest
COPY ./target/java-interview-questions-0.0.1-SNAPSHOT.jar java-interview-questions-0.0.1-SNAPSHOT.jar
CMD ["java","-jar","java-interview-questions-0.0.1-SNAPSHOT.jar"]

#docker container run --name mysqldb --network questions-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=bootdb -d mysql:8
#docker run -p 3000:3000 -d questions-frontend
