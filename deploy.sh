#!/bin/bash
export PATH="$PATH:/home/ubuntu/.nvm/versions/node/v20.9.0/bin/node"
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/ubuntu/certificate_backend/Backend_Certificate/
git pull origin main
npm install
npm run start