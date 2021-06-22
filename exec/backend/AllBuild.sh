!#/bin/sh

echo "+++ AuthServer"
cd ./AuthServer && ./gradlew clean build
echo "+++ ConfigServer"
cd ../ConfigServer && ./gradlew clean build
echo "+++ EurekaServer"
cd ../EurekaServer && ./gradlew clean build
echo "+++ ZuulServer"
cd ../ZuulServer && ./gradlew clean build
echo "+++ TransactionServer"
cd ../TransactionServer && ./gradlew clean build
echo "+++ CondolenceServer"
cd ../CondolenceServer && ./gradlew clean build