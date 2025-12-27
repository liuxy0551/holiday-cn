# git clone https://github.com/liuxy0551/holiday-cn.git
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
