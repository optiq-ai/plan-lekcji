FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Copy pom.xml
COPY pom.xml .
# Download dependencies
RUN mvn dependency:go-offline -B
# Copy source code
COPY src ./src
# Build the application
RUN mvn package -DskipTests
# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the built JAR file
COPY --from=build /app/target/*.jar app.jar
# Expose port
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
