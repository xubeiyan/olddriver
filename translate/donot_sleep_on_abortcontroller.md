# 不要忘记你还有 `AbortController`

### 翻译中……

> 翻译自[don't sleep on AbortController](https://kettanaito.com/blog/dont-sleep-on-abort-controller)

今天，我们来研究一下标准`JavaScript API`中的几乎被遗忘的一个东西——`AbortController`。

## `AbortController`是什么

[AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 是 `JavaScript` 中的可以控制终止任何异步事件的一个类，对，控制任何异步事件。

下面是一个简单的例子：

```javascript
const controller = new AbortController()

controller.signal
controller.abort()
```

一旦你创建了一个`AbortController`实例，将有两个可用的元素：

* `signal` 属性，是 [AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 类的实例。你可以提供任何API来触发`abort`事件，例如，提供这个值给 `fetch()` 请求可以触发放弃请求

* `.abort()` 方法，调用这个方法会触发`signal`的`abort`事件，同时也会将`signal`标记为`abort`

看起来很好，那我们要怎么实现`abort`的逻辑呢？