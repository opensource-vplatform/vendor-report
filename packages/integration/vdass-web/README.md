# 构建说明

## 本地vite打包

根目录上执行以下命令：
```sh
npm run build-vdaas-tenant
```

## 构件部署

### 代码提交
将本目录提交到
```url
https://scm.toone.com.cn:9501/Vproject1/Vdaas/Trunk/02vdaas_gateway/vdaas-web/src/main
```
### 构建docker镜像

#### 生成jar包
在eclipse中将packages\integration\vdass-web目录导入，然后通过maven install将目录打包成jar包。

#### 替换jar包

链接到服务器：10.1.39.119
cd到以下目录：/home/toone/toone-home/toone-build/vdaas-web/vdaasapp/lib
替换该目录下的：vdaas-web-1.0.jar

#### 构建docker镜像
cd到以下目录：/home/toone/toone-home/toone-build/vdaas-web
执行以下命令：
```sh
docker build --no-cache -t 10.1.39.165:9000/vdaas/vdaas-web:$(date +%Y%m%d) .
```

#### 推送docker镜像
将构建好的镜像推送到服务器上：
```sh
docker push 10.1.39.165:9000/vdaas/vdaas-web:$(date +%Y%m%d)
```

### 服务更新

#### 调整配置文件依赖的版本号

打开文件：/mnt/data/toone-home/vdaas-home-dev/vdaas.env

调整VDAAS_IMGTAG_WEB属性值：主要调整版本号，
```sh
VDAAS_IMGTAG_WEB=10.1.39.165:9000/vdaas/vdaas-web:20240513
#调整为
VDAAS_IMGTAG_WEB=10.1.39.165:9000/vdaas/vdaas-web:20240514
```
其中20240514为当前日期（tips:docker镜像构件时使用当前日期作为版本号）

#### 重启网关

cd到以下目录
```sh
/mnt/data/toone-home/vdaas-home-dev/vdaas-apps/vdaas-gateway
```
执行关闭命令：
```sh
docker compose down
```
执行启动命令:
```sh
docker compose up -d
```
至此，服务更新完毕。
