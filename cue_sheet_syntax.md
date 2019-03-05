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
* [TITLE](#tile)
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

有一个“DATA”的 