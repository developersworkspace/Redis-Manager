# -- BUILD AND INSTALL REDIS MANAGER --

# Update machine package indexes
sudo apt-get update

# Download and run script to install node 7
sudo curl -sL https://deb.nodesource.com/setup_7.x | bash -

# Install node 7
sudo apt-get install -y nodejs

# Install 'typescript' node package
npm install -g typescript

# Install 'gulp' node package
npm install -g gulp

# Install 'angular-cli' node package
npm install -g @angular/cli

# Clone 'Redis-Manager' repository
git clone https://github.com/developersworkspace/Redis-Manager.git

# Change directory to 'api'
cd ./Redis-Manager/api

# Install node packages for 'api'
npm install

# Build 'api'
npm run build

# Change directory to 'web'
cd ./../web

# Install node packages for 'web'
npm install

# Build 'web'
npm run build

# Change to root of repository
cd ./../

# Build docker images
docker-compose build --no-cache

# Run docker compose as deamon
docker-compose up -d

# -- INSTALL NGINX --

# Update machine package indexes
sudo apt-get update

# Install NGINX
sudo apt-get install -y nginx

# Add rule to firewall
sudo ufw allow 'Nginx HTTP'

# Download nginx.conf to NGINX directory
sudo curl -o /etc/nginx/nginx.conf https://raw.githubusercontent.com/developersworkspace/Redis-Manager/master/nginx.conf

# Restart NGINX
sudo systemctl restart nginx