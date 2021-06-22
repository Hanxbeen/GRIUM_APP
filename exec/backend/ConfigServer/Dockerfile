FROM 521797937488.dkr.ecr.ap-northeast-2.amazonaws.com/back_base:latest
EXPOSE 8888

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "-Djasypt.encryptor.password=wogml23", "/app.jar"]