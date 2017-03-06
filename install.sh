# -- INSTALL DOCKER --

# sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
# sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
# sudo apt-get update
# sudo apt-cache policy docker-engine
# sudo apt-get install -y docker-engine

# -- INSTALL DOCKER-COMPOSE --

# sudo curl -o /usr/local/bin/docker-compose -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)"
# sudo chmod +x /usr/local/bin/docker-compose

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

# Build and run docker compose as deamon
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