# 一个简单的关于Python内的命名空间(Namespaces)，作用域解析(Scope Resolution)，以及LEGB规则的介绍

> May 12, 2014
> by Sebastian Raschka

这是一篇简短的LEGB规则下关于Python的变量名的命名空间和作用域解析的文章。接下来的部分会以简短的例子代码形式解释简短的问题。你可以只阅读这篇文章，但我建议你运行例子里的代码——复制&粘贴即可。如果想更简便一点，点击[这里]()下载IPython notebook。


### 目录

* 目录
* 目标
* 关于命名空间(namespace)和作用域(scope)
	* 命名空间
	* 作用域
	* 提示
	* LEGB规则下变量的作用域解析
* LG - 局部(Local)和全局(Global)作用域
	* 为什么
	* 为什么
* LEG - 局部
