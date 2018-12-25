# Pull base image
FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./ # Not required for local development

# RUN npm install # Not required for local development
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
# COPY . . # Not required for local development

#
RUN apt-get update && apt-get -y install netcat && apt-get clean

# Add entrypoint file
COPY ./entrypoint.sh ./entrypoint.sh
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]

# EXPOSE 8080 # not required when using docker-compose

# CMD [ "npm", "start" ] # not required when using docker-compose