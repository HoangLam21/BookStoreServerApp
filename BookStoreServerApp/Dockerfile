FROM openjdk:17-jdk-alpine
EXPOSE 8090
ARG JAR_FILE=target/*.jar
COPY ./build/libs/BookStoreServerApp-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]