FROM harbor.fhzny.com:60002/web/node:14.19.2-slim

# # 进入工作目录
WORKDIR /home/app/fhzn-saas-web

COPY ./ /home/app/fhzn-saas-web

# 解决could not get uid/gid问题
RUN npm config set unsafe-perm true

RUN npm cache clean --force
# 安装项目依赖包
RUN npm install --registry=http://192.168.1.51/repository/npm-proxy/
# 全局安装pm2 启动进程管理
# RUN npm install pm2 -g

RUN npm run build:pro

# node环境变量
ENV NODE_ENV production

# # 暴露 端口
EXPOSE 8080

CMD ["node", "server/index.js"]
