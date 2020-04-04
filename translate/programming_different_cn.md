# 今天的计算机编程语言和20年前有何不同
 
> 本文翻译自[How is computer programming different today than 20 years ago?](https://medium.com/swlh/how-is-computer-programming-different-today-than-20-years-ago-9d0154d1b6ce)

> 译者注：开始我以为是技术文章，翻译到后面发现是吐槽文章，算了翻译完吧。
 
我看到Quora上有人问到这个问题，所以我打算写一篇回答。但这回答太长了所以我把它写成了一篇文章。
 
在过去20年中，我注意到了有很多改变。下面将他们以想到的顺序列出：
 
* 有许多编程的概念在20年前就被提出，到今天渐渐地成为了主流。其中包括了很多函数式编程中的规范，例如不可变性（immutability）、尾递归（tail recursion）、惰性求值（lazy evaluated collection），模式匹配（pattern matching），头等函数（first class function）等，并且鄙视着根本不去用他们的人。
 
* 现在桌面级软件指的是包含着浏览器的网页。（译者注：大概是指Electron和nwjs这一类披着桌面级外壳的本质浏览器和网页的形式）
 
* 面向对象编程（Object-Oriented Programming）虽然已经失去了很多市场，但它依然是全球最受欢迎的编程模型。基于新的特性的编程模型正在变得更加普遍，尤其是在现代语言中，如Go、Rust和Swift中。构成（composition）比继承（inheritance）更好用。（译者注：可以参考这篇[Wiki](https://en.wikipedia.org/wiki/Composition_over_inheritance)）
 
* 除非你参加了一个重量级的会议（大概参会费在2k以上吧）并分享了一张自拍，不然你还是不要称自己是写代码的。

* 因为当前多核心的CPU的流行，并发编程（parallel programming）的支持程度由20年前的原始系统调用层级上升到现在的编程语言层级了。在响应式编程（reactive programmin）中体现在异步编程特性（如async/await），并行协程（如Go的goroutine，或者D语言的channel）或者可观察性等组合型语义中。

* 像素（pixel）不再是一个度量相关单位了。

* 垃圾回收（Garbage collection）现在成为了保障程序安全运行的最常用方式。但新的安全模型也正在兴起，比如Rust的生命周期语义或者在在代码评审时开恶劣玩笑（snarky jokes in code reviews）。（译者注：作者你是不是无聊了……）

* 有30亿设备在运行Java，但这个数字在10年前就这么多了。（Oracle：作者你给我站住看我不打死你）

* 包管理系统（package management ecosystem）现在对于一个编程语言越来越重要了。人们并不想花太多时间在寻找、下载以及安装包上面了。20年前，我们习惯于在网站上下载压缩文件，将其复制到正确的位置，把他们加入到配置好的路径中，然后祈祷他们能够正常工作。

* 成立一个软件开发小组现在必须进行一项奇怪的仪式，那就是在每天早上在一起站15分钟并用便利贴画一些奇怪的符号。（译者注：指的就是每天早上开“站会”，本人比较反感这种。）

* 编程语言工具在今天大大地丰富了。过去一个编程语言大多有编译器（complier）或者多个调试器（debugger）。但现在大多有语法检查工具（LINT），源代码格式美化工具，模板创建工具，自我升级能力以及一长串你在竞争语言中无法用到的参数。

* 即使是同一种编程语言中都分为两派，缩进是用Tab呢还是空格？

* Adobe的Flash，在过去是唯一的提供良好交互体验的途径，谢天谢地，它没了。现在我们需要对三个不同的平台的三种不同的编程模型上提供相同级别的交互体验。（译者注：你真的不是Adobe请的反串黑？现在各个浏览器的兼容性还行吧）

* IDE和编程语言的独立性越来越大了。在过去，一种IDE基本上就只为一种语言服务，就像Eclipse对于Java，V现在