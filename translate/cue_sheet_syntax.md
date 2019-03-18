# Cue-Sheet 语法

## 目录

* [CATALOG](#catalog)
* [CDTEXTFILE](#cdtextfile)
* [FILE](#file)
* [FLAGS](#flags)
* [INDEX](#index)
* [ISRC](#isrc)
* [PERFORMER](#performer)
* [POSTGAP](#postgap)
* [PREGAP](#pregap)
* [REM](#rem)
* [SONGWRITER](#songwriter)
* [TITLE](#title)
* [TRACK](#track)

[返回目录](#目录)

## CATALOG

### 描述

此命令用于确定碟片的“媒体索引编号”(Media Catalog Number)。当用于商业出版的CDROM的母盘生产出来时，此编号就会正式使用。

### 语法

`CATALOG [media-catalog-number]`

### 例子

`CATALOG 1234567890123`    
`CATALOG 8340218374610`   

### 规则

索引编号是一串13位的数字，它是根据UPC/EAN的规则生成的。这条命令只会在cue sheet里出现一次（通常会出现在第一行，但这不是强制要求）。

[返回目录](#目录)

## CDTEXTFILE

### 描述

这条命令用于确定碟片的编码后的CD-TEXT信息的文件名。这条命令只用于CD-TEXT编辑器生成的cue文件中，或者由抓取含有CD-TEXT信息的碟片后自动生成的文件中。

### 语法

`CDTEXTFILE [filename]`

### 参数

`filename` - 文件名(可包含设备名字或者目录名字)，如果里面有空格的话必须用引号包裹起来。

### 例子

`CDTEXTFILE C:\TEST\DISC.CDT`    
`CDTEXTFILE "C:\LONG FILENAME.CDT"`    

### 规则

如果你的播放器不支持这个命令的话，会忽略这个命令。

[返回目录](#目录)

## FILE

### 描述

这条命令用于确定要被播放器使用的数据或者音频文件。

### 语法

`FILE [filename] [filetype]`

### 参数

`filename` - 文件名(可包含设备名字或者目录名字)    
如果里面有空格的话必须用引号包裹起来。
    
`filetype` - 文件类型    
支持下列文件类型：    
* BINARY - Intel格式的二进制文件（低位字节在前）
* MOTOROLA - Motorola格式的二进制文件（高位字节在前）
* AIFF - AIFF音频文件
* WAVE - WAVE音频文件
* MP3 - MP3音频文件

### 注意

所有的音频文件（WAVE、AIFF和MP3）必须以44.1KHz 16bit的立体声存储。

### 例子

FILE “C:\DATA\TRACK1.ISO” BINARY
FILE “C:\MUSIC\TRACK2.WAV” WAVE
FILE “C:\MUSIC\LONG FILENAME.MP3″ MP3

### 规则

`FILE`命令必须出现在除`CATALOG`之外的所有其他命令前。（译者注：并不一定，作者说他是从cdrwin帮助文件上copy过来的）

### 注意

对于**音频**文件来说，数据长度不是CDROM扇区长度（2352bytes）的整数倍的时候，最后一个扇区会用填0的方式补齐。

[返回目录](#目录)

## FLAGS

### 描述

此命令用来对某条音轨（track）设置特殊的次级标识位代码。这些标识位（flag）现在已经很少用到了。

### 语法

`FLAGS [flags]`

### 参数

标识位 -  支持特定的音轨标识位。    
支持下列文件类型：    
* DCP - 允许数字化复制
* 4CH - 4声道音频
* PRE - 预增强开启（仅适用音频）
* SCMS - 序列复制管理系统（不一定所有播放器都支持）

### 例子

`FLAGS DCP`    
`FLAGS 4CH PRE`

### 规则

FLAGS命令必须出现在TRACK命令之后，以及INDEX命令之前。每条音轨只允许有一个FLAGS命令起作用。

### 注意

有一个“DATA”的标记是为所有的非音频数据所准备的。这个标记或自动根据轨道的数据类型来确定。

[返回目录](#目录)

## INDEX

### 描述

此命令用来确定音轨（track）的索引（index）（或者子索引（subindex））。

### 语法

`INDEX [number][mm:ss:ff]`

### 参数

* number - 索引号（0~99）
* mm:ss:ff - 以分（m）秒（s）和帧数（f）决定的开始时间。（通常是75帧/秒）

### 注意

所有的索引号必须在0~99之中。第一个索引号必须是0或者1，后面的依次增加。第一个索引的开始时间必须是00:00:00。

`INDEX 0` 表示的是音轨的前置空白。     
`INDEX 1` 表示的是音轨数据的开始时间。这个索引数据值是储存在碟片的目录中的。    
`INDEX > 1` 则表示这个音轨的子索引。

[返回目录](#目录)

## ISRC

### 描述

此命令用来确定一条音轨的国际标准录音码（International Standard Recording Code）。只有生产商业碟片产品的母盘时此代码才会被使用。

### 语法

`ISRC (code)`

### 例子

`ISRC ABCDE1234567`

### 规则

ISRC的长度必须是12个字符。前5个字符必须是字母，后7个字符必须是数字。如果使用此命令，则它应该被放到`TRACK`命令之后，`INDEX`命令之前。

[返回目录](#目录)

## PERFORMER

### 描述

此命令用于确定一张启用了CD-TEXT的碟片的演奏者名字。

### 语法

`PERFORMER [performer-string]`

### 参数

* performer-string - 演奏者名字。如果名字里含有空格，则用双引号将他们括起来。演奏者名字必须小于等于80个字符。

### 例子

`PERFORMER "The Beatles"`

### 规则

如果`PERFORMER`命令出现在`TRACK`之前，则performer-string会被当成整张碟片的演奏者。如果此命令出现在`TRACK`之后，则performer-string会当成这条音轨的演奏者。注意，如果你的播放器不支持CD-TEXT，此命令会被忽略。

[返回目录](#目录)

## POSTGAP

### 描述

此命令用于确定音轨的后空白长度。后空白数据由cdr软件生成，而不是从当前数据文件中生成。

### 语法

`POSTGAP [mm:ss:ff]`

### 参数

* mm:ss:ff - 确定后空白的长度，三个部分分别为分，秒，帧。

### 例子

`POSTGAP 00:02:00`

### 规则

`POSTGAP`命令出现在所有针对当前音轨的`INDEX`命令之后。每段音轨只允许一个`POSTGAP`命令。

[返回目录](#目录)

## PREGAP

### 描述

此命令用于确定音轨的前空白长度。前空白数据由cdr软件生成，而不是从当前数据文件中生成。

### 语法

`PREGAP [mm:ss:ff]`

### 参数

* mm:ss:ff - 确定前空白的长度，三个部分分别为分，秒，帧。

### 例子

`PREGAP 00:02:00`

### 规则

`PREGAP`命令必须出现在`TRACK`命令之后，任意`INDEX`命令之前。每段音轨只允许一个`PREGAP`命令。

[返回目录](#目录)

## REM

### 描述

此命令用于在cue文件中添加注释。

### 语法

`REM (comment)`

### 例子

`REM This is a comment`

### 规则

无

[返回目录](#目录)

## SONGWRITER

### 描述

此命令用于确定一张启用了CD-TEXT的碟片的作曲者名字。

### 语法

`SONGWRITER [songwriter-string]`

### 参数

* songwriter-string - 作曲者名字。如果这个字段有空格，要使用双引号括起来。字符长度应小于80个字符。

### 例子

`SONGWRITER “Paul McCartney”`

### 规则

如果`SONGWRITER`命令出现在`TRACK`之前，则songwriter-string会被当成整张碟片的作曲者。如果此命令出现在`TRACK`之后，则songwriter-string会当成这条音轨的作曲者。注意，如果你的播放器不支持CD-TEXT，此命令会被忽略。

[返回目录](#目录)

## TITLE

### 描述

此命令用于确定一张启用了CD-TEXT的碟片的标题。

### 语法

`TITLE [title-string]`

### 参数

* title-string - 音轨或者碟片的标题。如果标题里含有空格，则应使用双引号将他们括起来。标题不应超过80个字符。

### 例子

`TITLE “The Beatles – Abbey Road”`
`TITLE “Here Comes the Sun”`

### 规则

如果`TITLE`命令出现在`TRACK`之前，则title-string会被当成整张碟片的标题。如果此命令出现在`TRACK`之后，则title-string会当成这条音轨的标题。注意，如果你的播放器不支持CD-TEXT，此命令会被忽略。

[返回目录](#目录)

## TRACK

### 描述

此命令用于标记一个音轨的起始。

### 语法

`TRACK [number] [datatype]`

### 参数

* number - 音轨编号（1-99）
* datatype - 音轨数据类型

允许使用下列数据类型：    

* AUDIO – Audio/Music (2352)
* CDG – Karaoke CD+G (2448)
* MODE1/2048 – CDROM Mode1 Data (cooked)
* MODE1/2352 – CDROM Mode1 Data (raw)
* MODE2/2336 – CDROM-XA Mode2 Data
* MODE2/2352 – CDROM-XA Mode2 Data
* CDI/2336 – CDI Mode2 Data
* CDI/2352 – CDI Mode2 Data

### 规则

所有的音轨编号都应在1~99之间。第一个编号可以大于1但后面的必须按顺序排列。每个文件至少得有一条音轨。

[返回目录](#目录)