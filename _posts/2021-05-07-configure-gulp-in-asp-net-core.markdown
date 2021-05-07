---
layout: post
title: "Configure Gulp in asp.net core 5.0"
date: 2021-05-07 18:54:34 +0430
category: configuration
tags: [gulp,.net core, configure gulp in .net core]
author: Hamed Moghadasi
description: > 
    In this article, firstly show you how configure and add gulp to asp.net core web application 
    and for the next will show you how to write gulp tasks in asp.net core 5.0, to automate and 
    enhance your workflow.
header_image: /assets/img/posts/gulp-dotnet-header.jpeg
    
image:
    path: /assets/img/posts/configure-gulp-in-asp-net-core.png
    height: 250
    width: 250
---

Modern web development has many repetitive tasks like running a local server, minifying code, optimizing images, preprocessing CSS and more. so [gulp](https://gulpjs.com/) born for automating all these tasks.
without gulp we have to do a lot of time-wasting, painful tasks, but with using gulp we can automate all these tasks.
### What we’re setting up ?
In this article we want to create a asp.net core web application and configure gulp to transpile our sass files to css and concat and minify our javascript files.
### Prerequisites
You need to have `dotnet` sdks on your machine for creating a dotnet application.
if you have not, you can download it from [this link](https://dotnet.microsoft.com/download/dotnet).

You need to have `Node.js` (Node) installed onto your machine before you can install Gulp.
If you do not have Node installed already, you can get it by [downloading the package installer from Node’s website](https://nodejs.org/).
### Getting Start
When you’re done with installing, create a dotnet web application.

then initialize `npm`:
```bash
npm init -y
```
The `npm init` command creates a `package.json` file for your project which stores information about the project, like the dependencies used in the project (Gulp is an example of a dependency).

Once the `package.json` file is created, we can install Gulp into the project by using the following command:
```bash
npm i gulp --save-dev
```
By default, the `wwwroot` folder in the ASP.NET Core project is treated as a web root folder. Static files can be stored in any folder under the web root and accessed with a relative path to that root. We’ll have to keep this folder structure in mind when we work on our Gulp configurations. Now, let’s begin by creating your first Gulp task in `gulpfile.js`, which stores all Gulp configurations.

craete `gulpfile.js` in the root of the project:
```bash
touch gulpfile.js
```
 here is project file structure:

 ![file structure](/assets/img/posts/gulp-dotnet-file-structure.png)
### Writing Your First Gulp Task
The first step to using Gulp is to `require` it in the gulpfile.
```javascript
let gulp = require('gulp');
```

The `require` statement tells Node to look into the `node_modules` folder for a package named gulp. Once the package is found, we assign its contents to the variable gulp.

We can now begin to write a gulp task with this gulp variable. The basic syntax of a gulp task is:
```javascript
gulp.task('task-name', function() {
  // code here
});
```

`task-name` refers to the name of the task, which would be used whenever you want to run a task in Gulp. You can also run the same task in the command line but before you should install `gulp-cli`:

```javascript
npm i gulp-cli -g
```
then you can run your task:
```javascript
gulp task-name
```

To test it out, let’s create a `hello` task:
```javascript
gulp.task('hello', function() {
  console.log('Hello gulpi!');
});
```

my favarite way to run and manages tasks is using `Task Runner Explorer` in Visual Studio. you can find it in 
`View > Other Windows > Task Runner Explorer`, you should see below windows:

![task runner explorer](/assets/img/posts/gulp-dotnet-task-runner-explorer.png)

as you can see it detect our written task. write click on `hello` and run it:

![task runner explorer](/assets/img/posts/gulp-dotnet-task-runner-explorer-output.png)

By setting a `binding` value for a task you can specify when task should run:

![task runner explorer](/assets/img/posts/gulp-dotnet-task-runner-explorer-binding-value.png)

### Real-World Example
In this example we want to transpile `scss` files to `css`. besides, we want to bundle and uglify some `js` files, too.
so at first I create a `scss` at `/wwwroot/scss/app.scss` then add below code to it:

```scss
$bg-color: "#efefef";

body {
  background-color: $bg-color;
}
```