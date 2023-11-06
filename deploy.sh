#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.9.0/bin

cd /home/ubuntu/certificate_backend/Backend_Certificate/
git pull origin main
npm install
npm run start