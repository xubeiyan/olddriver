# Web 后端开发笔试题目

- 你用过哪些 Web 开发框架？可以的话请简单说明 URL 路由的原理

>####后端:     
>开发框架PHP使用过基于MVC的ThinkPHP和CakePHP，其中ThinkPHP构建过项目，是从Python编写的数据库后端读取JSON数据，展现到使用ThinkPHP编写的Web后端上。当然我的任务是写PHP的Web后端，而CakePHP就仅限于使用过了。
>而Nodejs则使用过Express这个框架，基本上也是属于初学者的水平。敲的代码也基本上是照着《了不起的Node.js》和《Node和Express开发》在敲，其中值得发掘的地方还非常多。    

>####前端:    
>前端正在看React和AngularJS的书籍，如果说jQuery也算是一个的话，那也基本上算是用过吧，不过感觉自己的项目并用不上jQuery，所以基本上是手写JS代码。不过React和AngularJS这种MVVM的前端框架有很大的发展潜力。
>URL路由，是在接收HTTP请求的时候，选择请求发送至何处的一套规则。例如使用MVC框架时，由如Apache的Rewrite模块将其重新定向至新的URL上。比如将/classA/methodB/argumentC重定向至index.php?class=classA&method=methodB&argument=argumentC之上。达到减少URL长度，减少入口数量，增加对搜索引擎的友好等几个方面的作用

- 请设计一套选课系统的数据库表结构，并使其支持不同种类的用户对系统拥有不同的访问权限。

>####数据库：(如果是将权限细分而不是以角色如管理员老师学生这种方式来规定权限的话)    

>两个表user和course     
>#####user表    
*user_id (用户id，主键) int    
*user_name (用户名，非空) varchar    
*password (密码，非空) varchar    
*status (帐户状态，停用或者启用，非空) enum('disable','enable')    
*user_modify (用户管理，只有管理员可以添加或删除用户：管理员老师和学生) enum('no','yes')    
*course_modify (修改课程，只有老师有修改课程的权限，包括添加，修改，删除) enum('no', 'yes')    
*course_list (列出课程，老师和学生有列出课程的权限) enum('no', 'yes')    
*course_select (选择课程，只有学生有选择课程的权限) enum('no', 'yes')    
*selected_courses (选择的课程，course表course_id是其外键，可为空) int    
 
>#####course表
*course_id (课程id) int    
*course_name (课程名称) varchar    
*course_place (课程地点) varchar    
*course_time (课程时间) varchar    
*course_teacher (课程教师) varchar    

- 如果需要一个能缓存任何数据的功能，并支持在缓存失效时提供自定义 fallback 方法从其它地方获取数据，你会怎样实现它？请写出接口代码

>接口是不是只能用Java？Java实在是不擅长，于是就写个JavaScript的代码（使用了Express框架）
```javascript
var fs = require('fs'),
	...
	//处理此类请求的函数，url为请求资源路径，callback为回调函数
	request = function (url, callback) { 
		app.get(url, function (req, res) {
			// 使用fs.stat函数寻找这个文件是否存在
			fs.stat(absoutePath + '/' + url, function (err, stats) {
				if (err) {
					throw err;
				}
				if (stats.isFile()) { // 是文件则返回文件，不是则调用callback回调
					res.statusCode = 200;
					res.download(url);
					res.end();
				} else {
					callback();
				}
			});
		});
	},
	...
```

- 如果 Web 页面内一个功能需要执行很长时间（超过 Web 请求超时时间），执行结束后还要通知操作者，你会怎样实现它？

>这个问题我想到比较完美的方法是服务端先返回执行中，最后服务端主动推送完成消息的这一个解决方案了。

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
	* 包含指定文件名（包括目录）的数组
	*/
	public static function traverse($dir, $regexp) {
		// static可以使递归时$filename不被修改
		static $filename = [];
		
		if (!is_dir($dir)) {
			die($dir . 'is not a directory...');
		}
			
		foreach (scandir($dir) as $file) {
			// 跳过'.'及'..'
			if ('.' === $file || '..' === $file) {
				continue;
			}
			// 是目录则递归循环，不是则将文件名追加到$filename中
			if (is_dir($dir . '/' .$file)) {
				self::traverse($dir . '/' . $file, $regexp);
			} else {
				if (preg_match($regexp, $file)) {
					// 不是很清楚到底带不带完整路径
					//array_push($filename, $file);
					array_push($filename, $dir . '/' . $file);
				}
			}
			
		}
		return $filename;
	}
}
?>
```
>php这个内部无法访问到外部变量这点很难玩啊，global又不好用，还好有static(叹气)

- 使用任意工具实现功能（写出代码或命令）：从以下格式 nginx log 中找出用 IE9 以下（不含9）从非 030buy.com 域访问萌购主页的请求

```
1.2.3.4 - - [12/Nov/2013:01:02:03 +0800] "GET / HTTP/1.1" 200 2333 "http://weibo.com/xxx" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; InfoPath.2; QQBrowser/7.4.14847.400)" "-"
4.3.2.1 - - [12/Nov/2013:02:03:04 +0800] "GET /url2 HTTP/1.1" 404 233 "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17 SE 2.X MetaSr 1.0" "-"
1.2.3.4 - - [12/Nov/2013:03:04:05 +0800] "GET / HTTP/1.1" 200 23333 "http://www.030buy.com/url1" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; InfoPath.2; QQBrowser/7.4.14847.400)" "-"
9.8.7.6 - - [12/Nov/2013:04:05:06 +0800] "GET / HTTP/1.1" 200 2333 "http://weibo.com/xxx" "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)" "-"
6.7.8.9 - - [12/Nov/2013:05:06:07 +0800] "GET / HTTP/1.0" 200 2333 "-" "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" "123.123.123.123"
```

>用JavaScript（nodejs）吧，看了下最初的日志想用正则表达式最后还是放弃了……
```javascript
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
	input: fs.createReadStream('nginx-access.log')
});

rl.on('line', function (line)  {
	log = line.split('"');
	// 检查log[1] GET / HTTP/1.10
	// 检查log[3] http://weibo.com/xxx
	// 检查log[5] Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; InfoPath.2; QQBrowser/7.4.14847.400)
	uri = log[1];
	refer = log[3];
	userAgent = log[5];
	//console.log(uri, refer, userAgent);
	// 第一个代表请求的是"/"，第二个indexOf返回-1代表没找到030buy.com(省略了另一个域名的判断)
	if (uri.split(' ')[1] == '/' && refer.indexOf('030buy.com') == -1) {
		if (userAgent.indexOf('MSIE 8') != -1 || userAgent.indexOf('MSIE 7') != -1) {
			//console.log(userAgent.indexOf('MSIE 8'), userAgent.indexOf('MSIE 7'));
			console.log(line);
		}
	}
});
```

>其实找了个命令行的，我根本不会Linux，下面都是乱说的（没有Linux系统没法测    
>$1为请求路径，$5为跳转URI，$6为浏览器字符串     
```
awk -F'"' '/GET/ {print $1 $5 $6}' /var/log/nginx-access.log | grep \/ (http:\/\/(www.)?030buy\.com) (.*)MSIE [6-8](.*) 
```