# Web 后端开发笔试题目

- 你用过哪些 Web 开发框架？可以的话请简单说明 URL 路由的原理

####后端：
>开发框架PHP使用过ThinkPHP和CakePHP，其中ThinkPHP构建过项目，是从Python编写的数据库后端读取JSON数据，展现到

- 请设计一套选课系统的数据库表结构，并使其支持不同种类的用户对系统拥有不同的访问权限。

####数据库：
>两个表user和course
 #####user表
 *user_id (用户id)
 *user_name ()
 *user

- 如果需要一个能缓存任何数据的功能，并支持在缓存失效时提供自定义 fallback 方法从其它地方获取数据，你会怎样实现它？请写出接口代码
>Java实在是不擅长，于是就写个JavaScript的代码
```javascript
```
- 如果 Web 页面内一个功能需要执行很长时间（超过 Web 请求超时时间），执行结束后还要通知操作者，你会怎样实现它？

>这个问题我想到比较完美的方法只有服务端主动推送完成消息的这一个解决方案了。

- 使用 PHP 实现一个方法：遍历一个文件夹及子文件夹，返回所有符合指定正则条件的完整文件名
>方法如下：
```php
<?php
/**
* 遍历
*/
class Answer {
	/**
	* 遍历文件夹及子文件夹，返回所有符合指定正则条件的完整文件名
	* 参数：
	* dir (需要遍历的目录)
	* regexp (正则表达式)
	* 返回值：
	* 包含指定文件名的数组
	*/
	public static function traverse($dir, $regexp) {
		$filename = [];

		if (!is_dir($dir)) {
			die($dir . 'is not a directory...');
		}
			
		function visit($directory) {
			while ($file = readdir($directory) !== false) {
				// 是目录
				if (is_dir($file)) {
					if ($file != '.' && $file != '..') {
						visit($file);
					}
				// 是文件
				} else {
					if (preg_match($regexp, $file, $matches)) {
						array_push($filename, $matches); 
					}
				}
			}
		}
		
		return $filename；
	}
}

print(Answer::traverse('.', 'abc'));
?>
```


- 使用任意工具实现功能（写出代码或命令）：从以下格式 nginx log 中找出用 IE9 以下（不含9）从非 030buy.com 域访问萌购主页的请求

```
1.2.3.4 - - [12/Nov/2013:01:02:03 +0800] "GET / HTTP/1.1" 200 2333 "http://weibo.com/xxx" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; InfoPath.2; QQBrowser/7.4.14847.400)" "-"
4.3.2.1 - - [12/Nov/2013:02:03:04 +0800] "GET /url2 HTTP/1.1" 404 233 "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17 SE 2.X MetaSr 1.0" "-"
1.2.3.4 - - [12/Nov/2013:03:04:05 +0800] "GET / HTTP/1.1" 200 23333 "http://www.030buy.com/url1" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; InfoPath.2; QQBrowser/7.4.14847.400)" "-"
9.8.7.6 - - [12/Nov/2013:04:05:06 +0800] "GET / HTTP/1.1" 200 2333 "http://weibo.com/xxx" "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)" "-"
6.7.8.9 - - [12/Nov/2013:05:06:07 +0800] "GET / HTTP/1.0" 200 2333 "-" "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" "123.123.123.123"
```

用JavaScript（nodejs）吧
```javascript
var fs = require('fs'),
```
