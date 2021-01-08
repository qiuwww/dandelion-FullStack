# 遇到的问题

## android 不能运行

原因是使用了高版本的[Java sdk，修改 1.13 为 1.8 的](https://reactnative.cn/docs/getting-started#java-development-kit)。

直接修改.zshrc 的 export_home。

```bash
# 设置 JDK 环境变量
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home
export JAVA_13_HOME=/Library/Java/JavaVirtualMachines/jdk-13.0.2.jdk/Contents/Home

# Mac OS X 10.5 及以后的版本也可这样设置（推荐）：
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8`
export JAVA_13_HOME=`/usr/libexec/java_home -v 13`

# 设置默认的JDK版本
export JAVA_HOME=$JAVA_8_HOME
```

### 还是要运行更新

`Failed to install the following Android SDK packages as some licences have not been accepted.` 从此开启有点漫长的脱坑之路。

出现这个为在解决后发现主要是两个问题：

1. 一个是 sdkmanager 没有更新；
2. 另一个原因是项目配置的 build-tools  platforms platform-tools 和本地下载的版本存在不一致的情况。

<https://blog.csdn.net/qq_30346413/article/details/96137430>

## ios 是没法运行

pod install 的问题，多安装几次，翻墙操作。

## 如何通过编辑器来启动

1. ios > xcode -> **MyApp.xcodeproj**;
2. [开发环境配置](https://reactnative.cn/docs/getting-started#java-development-kit)，这里还需要配置环境变量。
   1. 需要先安装了模拟器，才能启动模拟器；
   2. 更需要 android sdk；
   3. 使用编辑器打开，首先打开 android studio，选择 open an existing Android Studio project， 选择：项目名\android 目录下的 **build.gradle** 文件；
   4. 然后，安装之后就可以直接运行起来了。
