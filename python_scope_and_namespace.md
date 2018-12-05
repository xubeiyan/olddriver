# 一个简单的关于Python内的命名空间(Namespaces)，作用域解析(Scope Resolution)，以及LEGB规则的介绍

> May 12, 2014
> by Sebastian Raschka

原文链接：[A Beginner's Guide to Python's Namespaces, Scope Resolution, and the LEGB Rule](http://sebastianraschka.com/Articles/2014_python_scope_and_namespaces.html)

### 翻译对照
| English      | 中文         |
| :----------: | :----------: |
| namespace    | 命名空间     |
| scope        | 作用域       |
| enclosed     | 封闭         |
| built-in     | 内建的       |

这是一篇简短的LEGB规则下关于Python的变量名的命名空间和作用域解析的文章。接下来的部分会以简短的例子代码形式解释简短的问题。你可以只阅读这篇文章，但我建议你运行例子里的代码——复制&粘贴即可。如果想更简便一点，点击[这里]()下载IPython notebook。

### 目录/Sections

* [目录](#-Sections)
* [目标](#-Objectives)
* [关于命名空间(namespace)和作用域(scope)的介绍](#-Introduction-to-namespaces-and-scopes)
	* [命名空间](#-Namespaces)
	* [作用域](#-Scope)
	* [提示](#-Tips)
	* [LEGB规则下变量的作用域解析](#legb-scope-resolution-via-LEGB-rule)
* 1.LG - 局部(Local)和全局(Global)作用域
	* 为什么
	* 为什么
* 2.LEG - 局部(Local)、封闭(Enclosed)和全局(Global)作用域
	* 为什么
* 3.LEGB - 局部(Local)、封闭(Enclosed)、全局(Global)和内建(Built-in)作用域
	* 为什么
* 自测题
* 结论
	* 缓存规则
	* 解决方案
	* 注意：For循环中变量会泄露至全局命名空间的问题
	
### 目标/Objectives

* 命名空间和作用域 - Python是怎么寻找变量名的？
* 我能够同时定义/重用多个变量名吗？
* Python是以什么样的顺序查找不同的命名空间中的变量名的？

### 关于命名空间和作用域的介绍/Introduction to namespaces and scopes

#### 命名空间/Namespaces

简单来说，命名空间指的是包含名字到对象指向的一个集合。你也许已经听说过，字面量(literal)、列表(list)、字典(dictionary)、函数、类等等，在Python中都是一个对象。一个形如“名字到对象”这样的映射允许我们通过名字——这个名字是我们指定的，来访问对应的对象。例如，我们假设了`a_string = "Hello string"`这样一条规定字符串的值的语句，就创建了一个到`"Hello string"`的引用，因此我们可以使用`a_string`这个变量名来访问这个字符串。

我们可以使用Python中的字典数据结构来描述一个命名空间。在这其中，字典的键(key)代表了名字，而字典的值(value)代表了对象本身（然而这正是Python中命名空间的表现形式）。例如：
```python
a_namespace = {'name_a': object_1, 'name_b': object_2, ...}
```

现在，我们在Python中拥有多个独立的命名空间，有意思的是某个名字可以在不同的命名空间中重复使用（假设这些对象是独立的）。例如：
```python
a_namespace = {'name_a': object_1, 'name_b': object_2, ...}
b_namespace = {'name_a': object_3, 'name_b': object_4, ...}
```

举个例子来说，每当我们调用一个for循环或者定义一个函数时，Python则会创建他们自己的命名空间。命名空间拥有不同的层级（也就是所谓的“作用域”），我们将在下一节详细讨论这个方面。

#### 作用域/Scope

在上一节内容中，我们了解了命名空间能够彼此独立存在，他们都拥有自己的层级，这个层级的概念就是“作用域”。在Python中，作用域代表了我们在搜索变量的“名字到对象”关系时的命名空间的优先程度。

举个例子，让我们看下面一段代码：     
```python
i = 1

def foo():
	i = 5
	print(i, 'in foo()')
	
print(i, 'global')

foo()
```
```
1 global
5 in foo()
```
在上面的代码里，我们两次定义了`i`这个变量，一次在全局，一次在`foo`函数里：

* `foo_namespace = {'i': object_3, ...}`
* `global_namespace = {'i': object_1, 'name_b': object_2, ...}`

那么问题来了，当需要输出变量i的值的时候，Python怎么知道要搜索哪个命名空间呢？这就是LEGB规则表现的舞台了，我们将在下一部分讨论这个问题。

#### 提示/Tips

如果我们想查看全局或者局部变量的字典的时候，我们可以使用`globals()`和`locals()`来进行查看。
```python
# print(globals()) # prints global namespace
# print(locals()) # prints local namespace

glob = 1

def foo():
	loc = 5
	print('loc in foo():', 'loc' in locals())
	
foo()
print('loc in global:', 'loc' in globals())
print('glob in global:', 'glob' in globals())

```

```
loc in foo(): True
loc in global: False
glob in global: True
```

#### LEGB规则下变量的作用域解析/Scope resolution via LEGB rule

我们已经了解了多个命名空间可以相互独立的存在，然后他们可以在不同的层级包含相同的变量名。而“作用域”定义了Python应该去哪个层级上搜索变量名对应的对象。现在问题来了，Python是以怎样的顺序来搜索不同的命名空间，直到它找到对应的“名字到对象”组合呢？

答案是，按照“LEGB规则”。LEGB规则就是：

> __Local(局部)__ ->__Enclosed(封闭)__ ->__Global(全局)__ ->__Built-in(内建)__

这里面箭头的方向代表了在命名层级空间中搜素的方向。

* __局部__代表这是在一个函数或者一个类方法里
* __封闭__代表这是一个`enclosing`（包含它的）函数中。例如一个函数被包含在另外一个函数中
* __全局__代表了执行脚本的最外层的位置
* __内建__代表了Python作为保留字的一些名称

于是，对于一个特定的名称，如果它对应的对象在局部命名空间里不能被找到的话，Python就会搜索它的封闭命名空间。如果在这里面的搜索还是没有找到，Python则会寻找全局命名空间里的值，类似的，向上一直到内建命名空间内。（如果在内建命名空间里还是没找到的话，会抛出一个`NameError`。）

##### 注意

命名空间是可以嵌套的。例如我们导入了一个模块(module)，或者我们定义了一个新的类。在这种情况下我们使用前缀来访问想要的命名空间。请看如下的代码：

```python
import numpy
import math
import scipy

print(math.pi, 'from the math module')
print(numpy.pi, 'from the numpy package')
print(scipy.pi, 'from the scipy package')
```
```
3.141592653589793 from the math module
3.141592653589793 from the numpy package
3.141592653589793 from the scipy package
```

(这也是我们在使用形如`from a_module import *`这种代码时需要小心的原因，因为它会导入其中的变量名，并将其置于全局命名空间里。这样就有可能覆盖了已经存在的变量名。)

### 1.LG - 局部(Local)和全局(Global)作用域

##### 例子 1.1

作为一个热身练习，我们先暂时不提LEGB规则里的封闭(E)和内建(B)作用域，先把眼光集中在局部(L)和全局(G)上。

那下面的代码会输出什么呢？
```python
a_var = 'global variable'

def a_func():
	print(a_var, '[ a_var inside a func() ]')
	
a_func()
print(a_var, '[ a_var outside a_func() ]')
```
##### a)
```
raise an error
```

##### b)
```
global variable [ a_var outside a_func() ]
```

##### c)
```
global variable [ a_var inside a_func() ]
global variable [ a_var outside a_func() ]
```

#### 原因

首先我们调用了`a_func()`，它是预定要输出`a_var`的值。根据LEGB规则，函数先会在它的局部作用域(L)里寻找。由于`a_func()`没有定义它自己的`a_var`，Python会向上一级，到全局作用域(G)里查找这个值，在全局作用域里这个值`a_var`已经被定义。

##### 例子 1.2