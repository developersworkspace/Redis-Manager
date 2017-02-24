# -- INSTALL DOCKER --

apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
apt-get update & apt-cache policy docker-engine
apt-get install -y docker-engine

# -- INSTALL DOCKER-COMPOSE --

curl -o /usr/local/bin/docker-compose -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)"
chmod +x /usr/local/bin/docker-compose

# -- BUILD AND INSTALL REDIS MANAGER --

# Update machine package indexes
apt-get update

# Download and run script to install node 7
curl -sL https://deb.nodesource.com/setup_7.x | bash -

# Install node 7
apt-get install -y nodejs

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