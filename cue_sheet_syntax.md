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

这条命令用于确定碟片的编码后的CD-TEXT信息的文件名。这条命令只用于CD-TEXT编辑器生成的cue文件中或者由

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