#!/bin/bash

cd ..
git pull
cd frontend
pnpm install
pnpm build
scp -r dist root@45.55.196.120:/var/www/html/course_xva_essentials/frontend &&
ssh root@45.55.196.120 "
  chown -R www-data:www-data /var/www/html/course_xva_essentials/frontend &&
  chmod -R 755 /var/www/html/course_xva_essentials/frontend
"
