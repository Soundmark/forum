### 前言
***
本项目是一个论坛，是我的一个伪全栈项目尝试，欢迎一起学习讨论！
#### 技术框架
>前端：vue + element ui + webpack
>后端：koa2 + mysql

### 目录
---
- 项目结构
- 项目依赖
- 环境搭建
- 前端
- 后端
- 优化
- 服务器部署上线
- 难点记录
- TODO

### 项目结构
---
```
|-- koa
|   |-- controller     //拿到前后端的数据进行处理
|   |-- dist           //vue中打包后生成的文件，作为静态资源托管到koa
|   |   `-- static
|   |       |-- css
|   |       |-- fonts
|   |       |-- img
|   |       `-- js
|   |-- model          //向数据库获取数据
|   |-- routers        //后端路由，处理前端请求
|   |-- service        //中转model中获取的数据，对数据库进行解耦
|   `-- static         //静态资源
`-- vue
    |-- build          //webpack打包参数文件
    |-- config         //webpack设置文件
    |-- dist           //webpack打包后生成的文件
    |   `-- static
    |       |-- css
    |       |-- fonts
    |       |-- img
    |       `-- js
    |-- src            //放置代码及图片的目录
    |   |-- assets     //放置图片及样式文件（我把样式都卸载vue里去了）
    |   |   `-- img
    |   |-- components //放置组件 
    |   |-- lib        //放置自己打包的一些方法
    |   |-- router     //vue-router文件
    |   |-- store      //vuex文件
    |   `-- view       //页面代码文件
    |       `-- user
    `-- static         //放置模拟数据的文件
```

### 项目依赖
---
前端依赖：vue、vue-router、vuex、axios、element ui、vue-quill-editor、vue-cli
后端依赖：koa、koa-router、koa-static、koa-body、koa-jwt、nodemon(非生产依赖)
可以通过`npm install 依赖名 -S(-D)`进行安装，-S是生产依赖，-D是非生产依赖
可以通过目录里面的package.json文件用`npm install`进行一次性安装

### 前端
---
#### 项目构建
1.通过`vue init webpack 项目名`创建项目

2.创建完成后通过`npm run dev`命令运行项目，能够访问到vue页面说明项目创建成功

3.打开项目文件，新建router、store和view文件夹分别存放vue-router、vuex和页面文件，在main.js中做如下配置引入vue-router、vuex和element ui
![](https://raw.githubusercontent.com/Soundmark/picture/master/forum/1.png)

#### 数据模拟
接下来我们应该先思考一下我们的前端页面会用到什么数据，然后模拟数据。
![](https://raw.githubusercontent.com/Soundmark/picture/master/forum/2.png)
>注意：由于webpack是模拟服务器环境的，我们要请求模拟数据时需要将数据放在static文件夹，作为一个静态资源才能够请求到。


#### 页面搭建
目前总共做了六个页面，分别为：主页，登录，注册，帖子详情，编辑，个人主页。具体怎么去做就不花篇幅去说了，构建页面的难度不是特别大。

##### 使用预处理器
值得一说的是我们可以再vue中使用css预处理器，方便我们编写样式，我以less为例：
先安装less-loader(注意less是非生产依赖，webpack打包的时候会将代码转换为css代码)，安装完成后再webpack.config.js中添加如下配置
![](https://raw.githubusercontent.com/Soundmark/picture/master/forum/3.png)

配置完成后就可以使用less来编写样式了，使用方法是在style标签中加上lang="less"属性
`<style lang="less"></style>`

##### 富文本编辑器
编辑页面我是使用了`vue-quill-editor`富文本编辑器的，这个编辑器可以高度定制，感觉很好用，而且使用也特别方便。
先`npm i vue-quill-editor`安装好库，然后在编辑页面配置如下代码：
```
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ['clean'], // 清除文本格式-----['clean']
  ['image'] // 链接、图片、视频-----['link', 'image', 'video']
]
export default {
  components: { quillEditor },
  data () {
    return {
      content: null,
      editorOption: {
        placeholder: '请输入文本...',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    }
  },
  methods: {
    onEditorBlur () {
      // 失去焦点事件
    },
    onEditorFocus () {
      // 获得焦点事件
    },
    onEditorChange () {
      // 内容改变事件
    },
  },
  mounted () {
    addQuillTitle()  //页面生成时载入编辑器
  }  
```
配置好后会在页面中生成文本编辑器，如下图：
![](https://raw.githubusercontent.com/Soundmark/picture/master/forum/4.png)
当然这是默认配置，而且编辑栏是纯图标，没有文字提示的，需要自行配置，如何配置可以自行Google，我这里不叙述了，想要自定义更多功能的可以通过`npm repo vue-quill-editor`查看官方api。

### 后端
---
#### 环境构建

#### 数据库配置

### 前后端交互
---

### 优化
---

### 服务器部署上线
---

### 难点记录
---

### TODO
---


