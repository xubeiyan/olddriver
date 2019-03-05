简易Python速查手册
==============

<sup>[下载本文件](https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md)
或者 [Fork这个项目](https://github.com/gto76/python-cheatsheet).
</sup>

Main(主文件)
----
```python
if __name__ == '__main__':
    main()
```

List(列表)
----
```python
# from_inclusive(起始下标（包含）) to_exclusive(终止下标（不包含）) step_size(步长)
<list> = <list>[from_inclusive : to_exclusive : step_size] 
```

```python
# 在列表后追加一个元素
<list>.append(<el>)
# 
<list>.extend(<collection>)
<list> += [<el>]
<list> += <collection>
```

```python
<list>.sort()
<list>.reverse()
<list> = sorted(<collection>)
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