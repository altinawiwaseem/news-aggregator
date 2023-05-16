# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files from the host to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files from the host to the container
COPY . .

# Build the frontend
RUN npm run build

# Expose the port on which the frontend will run (if needed)
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
