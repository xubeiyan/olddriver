简易Python速查手册
==============

[下载本文件](https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md)
或者 [Fork这个项目](https://github.com/gto76/python-cheatsheet)

Main(主文件)
------------
```python
if __name__ == '__main__':
    main()
```

List(列表)
----------
```python
# from_inclusive(起始下标（包含）) 
# to_exclusive(终止下标（不包含）)
# step_size(步长)
<list> = <list>[from_inclusive : to_exclusive : step_size] 
```

```python
# 在列表后追加一个元素
<list>.append(<el>)
# 在列表后追加一个新列表
<list>.extend(<collection>)
# 在列表后追加一个元素
<list> += [<el>]
# 在列表后追加一个新列表
<list> += <collection>
```

```python
# 对列表进行排序（修改此列表）
<list>.sort()
# 翻转列表（修改此列表）
<list>.reverse()
# 对列表进行排序（不修改此列表）
<list> = sorted(<collection>)
# 对列表进行翻转（不修改此列表）
<iter> = reversed(<list>)
```

```python
# 求所有元素的和
sum_of_elements  = sum(<collection>)
# 将两个列表对应元素求和
elementwise_sum  = [sum(pair) for pair in zip(list_a, list_b)]
sorted_by_second = sorted(<collection>, key=lambda el: el[1])
sorted_by_both   = sorted(<collection>, key=lambda el: (el[1], el[0]))
flatter_list     = list(itertools.chain.from_iterable(<list>))
product_of_elems = functools.reduce(lambda out, x: out * x, <collection>)
list_of_chars    = list(<str>)
```

```python
index = <list>.index(<el>)  # 返回第一个对应值元素的下标 
<list>.insert(index, <el>)  # 在对应下标处插入一个元素，并把剩下的元素后移
<el> = <list>.pop([index])  # 移除对应下标后面的元素（带下标参数）或者最后一个（不带参数）
<list>.remove(<el>)         # 移除第一个对应值的元素否则抛出一个ValueError错误
<list>.clear()              # 移除所有元素   
```

字典(Dictionary)
----------------

Dictionary
----------
```python
# 返回字典中所有key的列表
<view> = <dict>.keys()
# 返回字典中所有value的列表
<view> = <dict>.values()
# 返回字典中所有的元素的列表，以(key, value)的形式
<view> = <dict>.items()
```

```python
value  = <dict>.get(key, default=None)          # 查找key的value，如果key不存在则返回default。
value  = <dict>.setdefault(key, default=None)   # 同上，不过还会增加default到字典中。
<dict> = collections.defaultdict(<type>)        # 以type的默认值创建字典。
<dict> = collections.defaultdict(lambda: 1)     # 以默认值1创建字典。
```