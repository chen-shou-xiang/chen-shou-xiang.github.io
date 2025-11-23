---
title: 类加载器
createTime: 2025/10/14 21:27:29
permalink: /java/jvm/nqycs5st/
outline: "deep"
---

### 1. 类的生命周期

类的生命周期描述了一个类加载、使用、卸载的整个过程：
![alt text](classLifeCycle.png)

#### (1) 加载

类加载器将字节码信息（.class 文件、动态代理生成或网络传输的字节码）加载到方法区中；

- 创建 `InstanceKlass` 对象，保存类的所有信息（基本信息、常量池等）；
- 同时在堆中生成一份与方法区中数据类似的`java.lang.Class`对象。

:::details 图示

![alt text](classLifecycle-load.png)

:::

#### (2) 链接

- 验证：检查字节码是否符合虚拟机规范；
- 准备：为静态变量分配内存并设置默认值（`final修饰的常量` 变量则直接赋值）；
- 解析：将常量池中的符号引用转为直接引用(内存地址)。

#### (3) 初始化

行静态代码块中的代码，并为静态变量赋值。（即执行`clinit`方法）

:::details 以下情况类没有 clinit 方法

- 无静态代码块且无静态变量赋值语句;
- 有静态变量的声明，但是`没有赋值语句`;
- 静态变量时 `final 修饰的常量`，这类变量会在准备阶段直接进行初始化。

:::

:::details 触发类加载的情况

1. 执行 Main 方法的当前类；
2. 首次访问静态变量或静态方法；
3. Class.forName("类名")；
4. new 当前类创建对象；
5. 子类初始化时，若父类还未初始化则先触发（但通过子类访问父类的静态变量只会触发父类初始化）；

:::

:::details 不会触发类加载的情况

1. 访问 final 常量；
2. 创建该类数组；
3. Class.forName("类名", false, ...) 第二个参数为 false。

:::

### 2. 类加载器

类加载器（ClassLoader）用于获取字节码并将其加载到内存中。

#### 2.1 **类加载器分类**
(1). ==启动类加载器（BootstrapClassLoader）==：用于加载 JDK 自带的核心类库。

:::details JDK8 以及 JDK9 之后的启动类加载器

在 JDK8 中：

- 加载 `JAVA_HOME/jre/lib` 目录下的类库文件，此目录下包括 rt.jar，tools.jar，resources.jar 等，其中 java.lang、java.util、java.io 等核心包就位于 rt.jar 中；
- 由虚拟机自身实现（一般是 C++），无法获取其引用。（`String.class.getClassLoader() 返回 null `）；

在 JDK9 及之后：

- 引入 模块化系统 ，移除 `JAVA_HOME/jre` 目录，核心类库存放到 `jmod后缀` 的文件中；
- 部分逻辑由Java代码实现，但同样无法获取其引用。

:::

*[模块化系统]: 模块化系统不在本章的讨论范围。

(2). ==扩展类加载器 (ExtClassLoader)==：用于加载非核心的扩展类库（插件）。

:::details JDK8 以及 JDK9 之后的扩展类加载器

在 JDK8 中：

- 加载 `JAVA_HOME/jre/lib/ext` 目录下的类库文件;
- 继承链：
![alt text](extAndAppClassLoaderExtend.png)


在 JDK9 及之后：

- 引入 模块化系统 ，`ExtClassLoader` 被重命名为 `PlatformClassLoader`，其职责不再去加载特定目录，而是会去加载一些特定模块（java.xml等）。

:::

(3). ==系统类加载器 (AppClassLoader)==：用于加载`classpath`中的相关类库。

::: details classpath最终确定算法

- 若通过指定了`-cp`或`-classpath`vm参数，则优先使用指定的参数（可指定多个路径）；
- 若没有指定vm参数，则使用`CLASSPATH`环境变量（一般不推荐设置）。
- 若没有`ClASSPATH`环境变量，则使用当前目录（.）。

示例：

```text
/home/user/
|—— myapp/
│   └── MyApp.class
└── lib/
    └── utils.class
```

其中MyApp类中使用到utils中的工具类，且没有设置package包名，系统没有ClASSPATH环境变量；此时进入 `/home/user/myapp` 运行此类:
- 未指定vm参数，报错：ClassNotFoundException，找不到Utils中的类；
- 指定vm参数 `-cp "../lib"`, 报错：ClassNotFoundException，MyApp找不到；
- 添加vm参数 `-cp "../lib/;."`（lib目录和当前目录） 或 `-cp "../"`（user目录）, 运行成功。

:::


:::tip JDK9+中可以使用`--module-path`参数指定模块路径来加载指定模块中的类。
:::

#### 2.2 **获取当前类加载器的方式**
```java
public class MyApp {
    public static void main(String[] args) {
        // 方式一：
        ClassLoader cl1 = MyApp.class.getClassLoader();
        // 方式二：
        ClassLoader cl2 = this.getClass().getClassLoader();
        // 方式三：
        ClassLoader cl3 = Thread.currentThread().getContextClassLoader();
    }
 }
```

#### 2.3 **使用指定类加载器加载指定类库**

:::details JDK8中通过文件路径的方式

- BootstrapClassLoader:
    - 使用 JVM 参数进行扩展: `-Xbootclasspath/a:jar包目录/jar包名`
    - 放入 jre/lib 下进行扩展 [+extUserClass]

- ExtClassLoader:
    - 使用 JVM 参数进行扩展: `-Djava.ext.dirs=jar包目录`  [+jvmExtUserClass]
    - 放入 /jre/lib/ext 下进行扩展; [+extUserClass2]

- AppClassLoader:
    - vm参数: `-cp` 或 `-classpath` （优先级最高）；
    - `CLASSPATH` （优先级次之）；
    - `.` 默认当前运行目录。
:::

[+extUserClass]: 不推荐，尽可能不要去更改 JDK 安装目录中的内容，会出现即使放进去由于文件名不匹配的问题也不会正常地被加载。
[+extUserClass2]: 不推荐，尽可能不要去更改JDK安装目录中的内容。
[+jvmExtUserClass]: 推荐，使用进行扩展,这种方式会覆盖掉原始目录，可以用`;(windows):(macos/linux)`追加上原始目录。


:::details 通过代码的方式
- 使用`Class.forName`方法，使用当前类的类加载器去加载指定的类；
- 获取到类加载器，通过类加载器的loadClass方法指定某个类加载器加载。

> 注意：无法通过代码方式使用启动类加载器加载指定类，因为无法获取到启动类加载器实例对象。
:::

### 3. 双亲委派机制
**定义**：自底向上查找是否加载过，再由顶向下进行加载。
![alt text](ParentDelegationModel.png)

**作用**：
- `避免重复加载`：在双亲委派算法中，一个类只会加载一次，保证了类的全局唯一性。
- `安全性`：防止核心Java API（如java.lang.Object）被用户自定义的类所篡改，因为核心API最终会委派给启动类加载器进行加载；

:::details 双亲委派机制算法源码
```java title="ClassLoader.java"
// 这里是简易版，完整版请查阅源码
protected Class<?> loadClass(String name, boolean resolve)
    throws ClassNotFoundException
{
    synchronized (getClassLoadingLock(name)) {
        // 第一步：检查这个类是否已经被当前加载器加载过了
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            try {
                // 第二步：如果父加载器不为空，就委派给父加载器去加载
                if (parent != null) {
                    c = parent.loadClass(name, false); // 递归调用
                } else {
                    // 如果父加载器为空（说明是Bootstrap加载器），则调用本地方法委派给它
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // 父加载器无法完成加载，抛出ClassNotFoundException异常，我们将捕获它，但不做任何处理
                // 这是为了进入第三步：自己尝试加载
            }

            // 第三步：如果父加载器（包括Bootstrap）都没找到，才调用自己的findClass方法
            if (c == null) {
                c = findClass(name);
            }
        }
        // 如果指定要解析，则进行链接阶段的解析操作
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```

> findClass() 方法通常是由 ClassLoader 的子类重写的，用于定义自己特定的类加载逻辑（例如，从网络、字节码文件、数据库中加载）。而 loadClass() 方法实现了双亲委派的算法框架，一般不建议重写它。

:::

### 4. 打破双亲委派机制

(1) **自定义类加载器**

 继承 `ClassLoader` 抽象类，重写`loadClass`方法。

:::details 示例：Tomcat 服务器支持部署多个 war 包（Servlet 应用）

Tomcat 支持部署多个 war 包，例如配置`上下文路径`模式:

工作原理：

1.你将你的 Web 应用打包成 WAR 文件，例如 wiki.war 和 blog.war。

2.你把这两个文件放到 Tomcat 的 webapps 目录下。

3.Tomcat 会自动解压并部署它们。默认情况下，WAR 文件的名字就是应用的上下文路径。

访问示例：

•要访问 wiki 应用，你的 URL 是：http://yourdomain.com:8080/wiki

•要访问 blog 应用，你的 URL 是：http://yourdomain.com:8080/blog

以上实现基于 Tomcat 的自定义类加载器，他可以为每一个 war 包创建一个单独的类加载器实例去加载各自 war 包中的类，以实现一个 JVM 部署多个 Servlet 应用。

具体配置方式以及类加载器原理，请查阅 Tomcat 文档或问 AI。

:::

(2) **SPI机制 + 线程上下文类加载器**

==SPI 机制=={.important} ：通过 `约定` + `反射机制` 获取第三方提供的接口实现类的机制；

==线程上下文类加载器=={.important}：默认为`ApplicationClassLoader`, 可以通过`setContextClassLoader`方法设置。

:::important 为什么SPI机制 + TCCL 可以打破双亲委派机制？

按照双亲委派机制，`启动类加载器`和`扩展类加载器`只能加载自身负责的类，但在这部分类中，可以通过获取 TCCL 去加载不属于其职责范围内的类，如classpath中的类，而这部分类可以由SPI机制**动态**获取到。正是因为此TCCL机制和SPI机制的设计，从而打破了双亲委派机制。

如 java.lang.DriverManager，其内部通过 TCCL 加载了 classpath 中的第三方 jar 包提供的 Driver 实现，也就是启动类加载器委派应用类加载器去加载类，具体可以看以下 JDBC 示例。

:::


:::details SPI 机制原理

- **核心思想**：解耦与可扩展性。程序核心逻辑只面向接口编程，具体实现由第三方提供，并可动态替换。
- **实现原理**：
  1. **基于约定**：服务提供方必须在 JAR 包的 `META-INF/services/` 目录下（或 classpath 根目录下），创建以**接口全限定名**命名的配置文件，并在文件内填写**实现类的全限定名**。
  2. **基于反射**：程序通过 `java.util.ServiceLoader` 类扫描 Classpath，找到所有符合约定的配置文件，并利用**反射机制**动态加载并实例化这些实现类。
- 标准的 SPI 架构：
  - `服务接口定义方 (API/SPI Jar)`：一个独立的、轻量级的 JAR 包，例如 payment-api.jar。它只包含服务接口，比如我们的 PayService 接口。它不包含任何具体的实现。它的唯一目的就是定义一个“契约”。
  - `服务实现提供方 (Provider Jar)`：第三方开发者（或您自己团队的另一个模块）创建的 JAR 包，例如 alipay-provider.jar 或 wechatpay-provider.jar。这个提供方的项目，必须依赖于第一步中的 payment-api.jar。这样，它才能导入此接口并提供自身实现（如 Alipay）。
  - `服务使用方 (Consumer Application)`：需要使用支付功能的应用程序，它也必须依赖于 payment-api.jar，这样它才能通过接口 PayService 来编码，并调用 ServiceLoader.load(PayService.class)。这个应用程序在编译时完全不知道 Alipay 或 WechatPay 类的存在，它只知道 PayService 接口，在运行时，只需要将它想使用的提供方 JAR（如 alipay-provider.jar）放到它的类路径下。

支付示例：

maven 项目依赖结构：

```text
                    +-----------------------------+
                    |          spi-consumer       |
                    |           (服务消费者)        |
                    +-----------------------------+
                      /             |            \
                     /              |             \
                    /               |              \
                   /                |               \
                  v                 v                v
+----------------+         +----------------+         +------------------+
|   spi-alipay   |         |    spi-api     |         |  spi-wechatPay   |
| （ 服务提供者 )  |-------> |    (服务接口)    | <------|   （服务提供者）    |
|                |         |                |         |                  |
+----------------+         +----------------+         +------------------+
```

- spi 服务接口定义方（spi-api）：

  ```java
  package com.api;
  
  public interface PayService {
      void pay();
  }
  ```

- spi 服务实现提供方（以 spi-Alipay 为例）：

  （1）实现接口

  ```java
  package com.alibaba;
  
  import com.api.PayService;
  
  public class Alipay implements PayService {
      @Override
      public void pay() {
          System.out.println("this is alipay");
      }
  }
  ```

  （2）在`resource`目录中创建`META-INF/servicers/com.api.PayService`，内容为实现类全限定名：

  ```text
  com.alibaba.Alipay
  ```

- 服务使用方（spi-consumer）：

  ```java
  package com.summer;
  
  import com.api.PayService;
  
  import java.util.ServiceLoader;
  
  public class App {
      public static void main(String[] args) {
          ServiceLoader<PayService> payServices = ServiceLoader.load(PayService.class);
          for (PayService payService : payServices) {
              payService.pay();
          }
      }
  }
  ```

  测试引入 alipay 和 wechatPay 包的效果，如果两个都引入，则打印：

  ```text
  this is alipay
  wechatPay is running
  ```

  如果通过 java -jar 运行，则需要配置打包 Fat JAR [+farjar] 的插件：

  ```xml
  <build>
      <plugins>
          <!-- 这里以shade插件为例，此插件会将依赖包一起打包-->
          <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-shade-plugin</artifactId>
              <version>3.5.1</version>
              <executions>
                  <execution>
                      <phase>package</phase>
                      <goals>
                          <goal>shade</goal>
                      </goals>
                      <configuration>
                          <transformers>
                              <!-- 此transformer指定启动类-->
                              <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                  <mainClass>com.summer.App</mainClass>
                              </transformer>
                              <!-- 此transformer会将依赖包的META-INF/services/目录下的SPI实现类文件合并 -->
                              <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                          </transformers>
                      </configuration>
                  </execution>
              </executions>
          </plugin>
      </plugins>
  </build>
  ```

需要注意到是，以上SPI示例并没有打破双亲委派机制，因为服务接口定义方、服务实现提供方、服务使用方都位于classpath中，都由AppClassLoader加载。

:::

[+farjar]: 将项目自身代码和所有依赖的第三方库一起打包到一个单独的 JAR 文件中，这就被称为 "Fat JAR"（胖 JAR 包）或者 "Uber JAR"。

:::details JDBC 示例

JDBC 的实现方式与上方的简单示例类似：

- spi 服务接口定义方：JDK 自带的`java.sql.Driver`

- spi 服务实现提供方：各大数据库厂商，如 `mysql-connector-j-9.4.0.jar`

- 服务使用方：JDK 自带的 `DriverManager`

  - 正是因为 **spi 服务接口定义方** 与 **服务使用方** 是 JDK 自带的，因此仅需引入第三方数据库驱动 jar 包即可获取对应的Driver执行数据库操作；
  - 但同时也因为 **spi 服务接口定义方** 与 **服务使用方** 是 JDK 自带的，而其位置在 rt.jar (JDK8)中，根据双亲委派机制 `DriverManager`由启动类加载器加载，而启动类加载器无法加载 classpath 下的第三方 jar 包的 Driver 实现，因此只能委派线程上下文类加载器去加载，因此被认为打破了双亲委派机制。
  - 因此仅需引入第三方driver jar包，在编写以下几行代码即可轻松实现：

  ```java
    public static void main(String[] args) throws SQLException {
          String url = "jdbc:mysql://localhost:3306/esign-low-code-framework?useSSL=false&serverTimezone=UTC";
          try(
              //1. 获取连接
              Connection connection = DriverManager.getConnection(url, "root", "123456");
              //2. 获取Statement
              Statement statement = connection.createStatement();
              //3. 执行查询
              ResultSet resultSet = statement.executeQuery("SELECT * from sys_user limit 10");
          ) {
              //4. 结果处理
              while (resultSet.next()) {
                  System.out.printf("name: %s, account: %s\n",
                          resultSet.getString("name"),resultSet.getString("account")
                  );
              }
          }
      }
  ```

  

:::

(3) **OSGI框架**

用的不多，暂不介绍。

### 5. JDK9之后的变化

引入了模块化机制：
- 通过 `-module-path` 参数指定模块路径；可在module-info.java文件声明模块导入导出与指定SPI机制的实现类；
- 如果不通过`-module-path`参数使用模块化机制，类加载器的行为与SPI机制完全兼容JDK8。

:::tip
尽管引入了模块化机制，但是使用的场景很少，因为用maven、gradle构建工具就可以实现大部分功能了，且大部分框架并没有提供模块化的包，如Spring、Mybatis等（可能未来某一年会有）。
:::
