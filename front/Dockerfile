# Use official node image as the base image
FROM node:lts-hydrogen as build

# Set the working directory
WORKDIR /usr/local/app

# Copy package files first for better cache usage
COPY package*.json ./

# Install dependencies
RUN npm ci --silent || npm install --silent

# Copy rest of the sources
COPY . .

# Build the Angular app into a flat `dist/` directory so it's easy to copy to nginx
# We pass --output-path=dist so the CLI places build files directly in `dist/` (not `dist/<project-name>`)
RUN npm run build -- --output-path=dist --configuration production

# Stage 2: serve app with nginx
FROM nginx:stable-alpine

# Replace default nginx config with one that supports SPA routing (try_files -> index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files to nginx html root
COPY --from=build /usr/local/app/dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]