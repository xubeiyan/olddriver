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

这是一篇简短的LEGB规则下关于Python的变量名的命名空间和作用域解析的文章。接下来的部分会以简短的例子代码形式解释简短的问题。你可以只阅读这篇文章，但我建议你运行例子里的代码——复制&粘贴即可。如果想更简便一点，点击[这里](https://raw.githubusercontent.com/rasbt/python_reference/master/tutorials/scope_resolution_legb_rule.ipynb)下载IPython notebook。

### 目录

* [目录](#目录)
* [目标](#目标)
* [关于命名空间(namespace)和作用域(scope)的介绍](#关于命名空间namespace和作用域scope的介绍)
	* [命名空间](#命名空间)
	* [作用域](#作用域)
	* [提示](#提示)
	* [LEGB规则下变量的作用域解析](#legb规则下变量的作用域解析)
* [1.LG - 局部(Local)和全局(Global)作用域](#1lg---局部local和全局global作用域)
	* [原因](#原因1-1)
	* [原因](#原因1-2)
* [2.LEG - 局部(Local)、封闭(Enclosed)和全局(Global)作用域](#2leg---局部local、封闭enclosed和全局global作用域)
	* [原因](#原因2)
* [3.LEGB - 局部(Local)、封闭(Enclosed)、全局(Global)和内建(Built-in)作用域](#3legb---局部local、封闭enclosed、全局global和内建built-in作用域)
	* [原因](#原因3)
* [自测题](#自测题)
* [结论](#结论)
	* [经验规则](#经验规则)
	* [问题答案](#问题答案)
	* [注意：For循环中变量会泄露至全局命名空间的问题](#注意for循环中变量会泄露至全局命名空间的问题)
	
### 目标

* 命名空间和作用域 - Python是怎么寻找变量名的？
* 我能够同时定义/重用多个变量名吗？
* Python是以什么样的顺序查找不同的命名空间中的变量名的？

### 关于命名空间(namespace)和作用域(scope)的介绍

#### 命名空间

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

#### 作用域

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

#### 提示

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

#### LEGB规则下变量的作用域解析

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

现在，让我们在全局和局部作用域里都定义一个变量`a_var`。

你能猜到下面的代码会输出什么吗？
```python
a_var = 'global value'

def a_func():
	a_var = 'local value'
	print(a_var, '[ a_var inside a_func() ]')
	
a_func()
print(a_var, '[ a_var outside a_func() ]')
```

a)
```
raise an error
```

b)
```
local value [ a_var inside a_func() ]
global value [ a_var outside a_func() ]
```

c)
```
global value [ a_var inside a_func() ]
global value [ a_var outside a_func() ]
```

#### 原因

当我们调用`a_func()`的时候，Python会先去寻找局部作用域(L)里的`a_var`，因为`a_var`已经在`a_func`的局部作用域里定义了，它的值为`local value`，所以会输出这个值。注意它并未影响到全局作用域，因为他们是不同的作用域。

但是我们可以在局部作用域中修改全局作用域里的值，使用`global`关键字就可以将该变量的作用层级提高到全局。参见下面的例子：
```python
a_var = 'global value'

def a_func():
	global a_var
	a_var = 'local value'
	print(a_var, '[ a_var inside a_func() ]')
	
print(a_var, '[ a_var outside a_func() ]')
a_func()
print(a_var, '[ a_var outside a_func() ]')
```

```
global value [ a_var outside a_func() ]
local value [ a_var inside a_func() ]
local value [ a_var outside a_func() ]
```

但我们必须小心顺序问题：如果我们忘记了用特定标记指明我们修改的是一个全局作用域中的变量，就非常容易抛出一个`UnboundLocalError`（因为赋值语句的右边会先被执行）：

```python
a_var = 1

def a_func():
	a_var = a_var + 1
	print(a_var, '[ a_var inside a_func() ]')
	
print(a_var, '[ a_var outside a_func() ]')
a_func()
```
```
1 [ a_var outside a_func() ]
Traceback (most recent call last):
  File "test.py", line 8, in <module>
    a_func()
  File "test.py", line 4, in a_func
    a_var = a_var + 1
UnboundLocalError: local variable 'a_var' referenced before assignment	
```

### 2.LEG - 局部(Local)、封闭(Enclosed)和全局(Global)作用域

现在，我们来说明封闭(E)作用域。根据“局部”->“封闭”->“全局”的顺序，你能推测出下面的代码会输出什么吗？

##### 例子 2.1

```python
a_var = 'global value'

def outer():
	a_var = 'enclosed value'
	
	def inner():
		a_var = 'local value'
		print(a_var)
		
	inner()
	
outer()
```

##### a)

```
global value
```

##### b)

```
enclosed value
```

##### c)

```
local value
```

#### 原因

让我们快速的概括一下我们刚在所做的：我们先调用了`outer()`，它定义了一个局部变量`a_var`（相对全局作用域中的`a_var`）。然后，这个`outer()`函数调用了同样定义了一个`a_var`的`inner()`。在`inner()`方法里的`print()`函数首先会在它的局部作用域里搜索，因为它找到了一个，所以它会停止在更上一层里的搜索，打印出这个值。

和`global`关键字类似，我们可以在内部函数中使用`nonlocal`来开启对外层(Enclosed)函数中指定变量的访问，从而使其值可以被修改。

注意在本文写作时，`nonlocal`关键字已可以Python 3.x里使用(PEP-3104)但尚且不能在Python 2.x里使用。

```python
a_var = 'global value'

def outer():
	a_var = 'local value'
	print('outer before:', a_var)
	def inner():
		nonlocal a_var
		a_var = 'inner value'
		print('in inner():', a_var)
		
	inner()
	print("outer after:", a_var)
	
outer()
```
```
outer before: local value
in inner(): inner value
outer after(): inner value
```

### 3.LEGB - 局部(Local)、封闭(Enclosed)、全局(Global)、内建(Built-in)作用域

为了完整阐述LEGB规则，下面我们来了解一下内建作用域。比如我们定义了一个自己的计算长度的函数。这个函数和内建的`len()`函数一模一样。你认为下面的代码会输出什么样的结果呢？

##### 例子 3

```python
a_var = 'global variable'

def len(in_var):
	print('called my len() function')
	l = 0
	for i in in_var:
		l += 1
	return l	

def a_func(in_var):
	len_in_var = len(in_var)
	print('Input variable is of length', len_in_var)
	
a_func('Hello World')
```

##### a)
```
raise an error (conflict with in-built `len()` function)
```

##### b)
```
called my len() function
Input variable is of length 13
```

##### c)
```
Input variable is of length 13
```

#### 原因

为什么同样的名字能够用于指向不同的对象呢？——因为他们是在不同的作用域之中。再次使用`len`这个名字是没有任何问题的（这样做只是为了证明这个观点，实际上我们并不推荐这么做）。根据Python的L->E->G->B的作用域搜索规则，`a_func()`在全局作用域(G)就找到了`len()`的定义，而不是在内建作用域中(B)。

### 自测题

在学习了一大堆知识之后，现在，让我们检查一下我们的学习成果。下面的代码会输出什么？

```python
a = "global"

def outer():
	def len(in_var):
		print('called my len() function: ', end="")
		l = 0
		for i in in_var:
			l += 1
		return l
		
	a = 'local'
	
	def inner():
		global len
		nonlocal a
		a += ' variable'
	inner()
	print('a is', a)
	print(len(a))
	
outer()

print(len(a))
print('a is', a)
```

### 结论

希望这个简短的说明能够帮助你基本明白Python中依赖于LEGB法则的作用域工作方式。可以通过明天再尝试预测上文中的自测题的输出巩固今天的学习成果。

#### 经验规则

在实际应用中，**在函数内部修改全局变量不是一个好的选择**，因为这样会造成令人迷惑和很难被发现的错误。

如果你希望通过一个函数修改一个全局变量的值，推荐使用传给它一个值再用它返回一个值的方式。例如：
```python
a_var = 2

def a_func(some_var):
	return a_var**3
	
a_var = a_func(a_var)
print(a_var)
```
```
8
```

##### 问题答案

为了防止偷瞟答案的行为，我已经把答案写成了二进制编码的形式。要显示这些问题的答案，只需将其复制到Python解释器中运行

```python
print('Example 1.1:', chr(int('01100011', 2)))
```
```python
print('Example 1.2:', chr(int('01100010', 2)))
```
```python
print('Example 2.1:', chr(int('01100011', 2)))
```
```python
print('Example 3.1:', chr(int('01100010', 2)))
```

```python
# Execute to run the self-assessment solution

sol = "000010100110111101110101011101000110010101110010001010"\
"0000101001001110100000101000001010011000010010000001101001011100110"\
"0100000011011000110111101100011011000010110110000100000011101100110"\
"0001011100100110100101100001011000100110110001100101000010100110001"\
"1011000010110110001101100011001010110010000100000011011010111100100"\
"1000000110110001100101011011100010100000101001001000000110011001110"\
"1010110111001100011011101000110100101101111011011100011101000100000"\
"0011000100110100000010100000101001100111011011000110111101100010011"\
"0000101101100001110100000101000001010001101100000101001100001001000"\
"0001101001011100110010000001100111011011000110111101100010011000010"\
"1101100"

sol_str =''.join(chr(int(sol[i:i+8], 2)) for i in range(0, len(sol), 8))
for line in sol_str.split('\n'):
    print(line)
```

#### 注意：For循环中变量会泄露至全局命名空间的问题

和其他语言不同，Python中的`for`循环会泄露他们在`for`循环中定义的变量。
```python
for a in range(5):
	if a == 4:
		print(a, '-> a in for-loop')
print(a, ' -> a in global')
```
```
4 -> a in for-loop
4 -> a in global
```

**这甚至影响到我们在`for`循环之前定义的全局变量！**下面的例子会重新修改存在的变量的值：
```python
b = 1 
for b in range(5):
	if b == 4:
		print(b, '-> b in for-loop')
print(b, '-> b in global')
```
```
4 -> b in for-loop
4 -> b in global
```

但是在**Python 3.x**里我们可以使用闭包(closure)来避免`for`循环中的变量污染到全局变量中。这是一个例子（在Python 3.4中运行成功）
```python
i = 1
print([i for i in range(5)])
print(i, '-> in global')
```
```
[0, 1, 2, 3, 4]
1 -> i in global
```

为什么我这里要提到“Python 3.x”呢？因为同样的代码会在Python 2.x中输出:
```
...
(4, -> i in global)
```

原因在于Python 3.x中修改了`[]`的内部原理，参见[What's New In Python 3.0](https://docs.python.org/3/whatsnew/3.0.html)：

> "... 列表表达式`[]`有新的语义：现在它更接近一个在`list()`中使用生成器的语法糖，现在其中循环的的控制变量不会泄露至它的上一级作用域。..."

### 译者注

关于最后一个问题，现有的比较好的解决方案是使用`list()`代替`[]`生成，下面的代码在Python 2.7上运行成功
```python
i = 1
print(list(i in for i in range(5)))
print("%d -> i in global" % i)
```
```
[0, 1, 2, 3, 4]
1 -> i in global
```



