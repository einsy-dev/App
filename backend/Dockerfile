# Use an official Golang runtime as the base image
FROM golang:1.23.4-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download the Go modules
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application
RUN go build -o app ./cmd

# Expose the port that the application will listen on
EXPOSE 8080

# Set the command to run the application
CMD ["./app"]