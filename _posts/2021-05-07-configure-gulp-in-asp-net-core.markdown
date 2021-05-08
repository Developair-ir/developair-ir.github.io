---
layout: post
title: "Configure gulp in asp.net core"
date: 2021-05-07 18:54:34 +0430
category: learning
tags: [gulp,.net core, configure gulp in .net core]
author: Hamed Moghadasi
description: > 
    In this article, firstly show you how to configure and add gulp to asp.net core web application 
    and for the next will show you how to write gulp tasks in asp.net core 5.0, to automate and 
    enhance your workflow.
header_image: /assets/img/posts/gulp-dotnet-header.jpeg
comments: true
image:
    path: /assets/img/posts/configure-gulp-in-asp-net-core.png
    height: 250
    width: 250
---
Modern web development has many repetitive tasks like running a local server, minifying code, optimizing images, preprocessing CSS and more. so [gulp](https://gulpjs.com/) born for automating all these tasks.
without gulp, we have to do a lot of time-wasting, painful tasks, but with using gulp we can automate all these tasks.
### What we’re setting up?
In this article, we want to create an asp.net core web application and configure gulp to transpile our sass files to css and concat and minify our javascript files.
### Prerequisites
You need to have `dotnet` SDKs on your machine for creating a dotnet application.
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

create `gulpfile.js` in the root of the project:
```bash
touch gulpfile.js
```
 here is project file structure:

 ![file structure](/assets/img/posts/gulp-dotnet-file-structure.png)
### Writing Your First Gulp Task
The first step to using Gulp is to `require` it in the gulp file.
```javascript
let gulp = require('gulp');
```

The `require` statement tells Node to look into the `node_modules` folder for a package named gulp. Once the package is found, we assign its contents to the variable gulp.

We can now begin to write a gulp task with this gulp variable. The basic syntax of a gulp task is:
```javascript
gulp.task('task-name', () => {
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
gulp.task('hello', () => {
  console.log('Hello gulpi!');
});
```

my favorite way to run and manages tasks is using `Task Runner Explorer` in Visual Studio. you can find it in 
`View > Other Windows > Task Runner Explorer`, you should see below windows:

![task runner explorer](/assets/img/posts/gulp-dotnet-task-runner-explorer.png)

as you can see it detect our written task. write click on `hello` and run it:

![task runner explorer](/assets/img/posts/gulp-dotnet-task-runner-explorer-output.png)

By setting a `binding` value for a task you can specify when the task should run:

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

One of the biggest advantages of gulp is its plugins. Using community-built plugins is a quick way to get started with gulp. Each plugin does a small amount of work, so you can connect them like building blocks. Chain together plugins from a variety of technologies to reach your desired result.

so for working with `sass` we should install `gulp-sass`:

```bash
npm i gulp-sass --save-dev
```
then `require` it to `gulpfile`:

```bash
let sass = require('gulp-sass');
```

Now for transpiling `scss` we define below task:
```javascript
let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('compile:sass', () => {
    return gulp.src(`./wwwroot/scss/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./wwwroot/css/`));
});
```
Gulp makes use of pipes for streaming data that needs to be processed. `gulp.src(...)` turns the path at `./wwwroot/scss/**/*.scss` into a readable stream of data that we are then piping to the `gulp-sass` module. The `sass` task returns a stream that we then pipe to our destination and so on ...

with running this task, all the sass files in `wwwroot` folder transpiled to `css` and saved in the `./wwwroot/css/` folder.
now its time to run our task, I'll run it from task runner explorer, and below is the result of this task,
a file with name of `app.css` created:

```css
body {
  background-color: "#efefef"; 
}
```
We don't want to run this task manually every time, So to run it automatically we have to set a binding value to:

![binding value](/assets/img/posts/gulp-dotnet-task-runner-explorer-binding-value-after-build.png)

with setting a binding value a comment added to first of `gulpfile.js`:

```javascript
/// <binding AfterBuild='compile:sass' />
```

Why if we want transpile without building application (?!). Gulp has a built-in API called [`watch()`](https://gulpjs.com/docs/en/api/watch):
> this API allows https://gulpjs.com/docs/en/api/series globs and running a task when a change occurs. Tasks are handled uniformly with the rest of the task system.

```javascript
gulp.task('watch:sass', () => {
    gulp.watch(`./wwwroot/scss/**/*.scss`, (done) => {
        gulp.series(['compile:sass'])(done);
    });
});
```
[`series()`](https://gulpjs.com/docs/en/api/series):
> combines task functions and/or composed operations into larger operations that will be executed one after another, in sequential order.

when you run `watch:sass`, gulp watching all sass files in wwwroot, and when a change occure it will run `compile:sass` task. for these kinds of watching tasks, I set `project open` binding value. It means that when I open the project this task runs automatically.

Now imagine on `clean` a project I want to remove all generated `css` files, what should I do?! good answer, writing a new gulp task :)
for removing a file through code we need npm package, called `rimraf`, it will do `rm -rf` jobs for us:

```bash
npm i rimraf --save-dev
```
then you need to require it in `gulpfile.js`:

```javascript
let rimraf = require(`rimraf`);
```

now for cleaning add following task:

```javacript
gulp.task('clean:css', (callback) => {
    rimraf(`./wwwroot/css/`, callback);
});
```
I only use sass and do not write any code in css files, so it means that all of my css are kind of generated files, because of that when I run `clean:css` it will remove css folder completly. If you do not like me, change clean task as you want.

and set its binding value to `Clean Build`. your bindings should be like below:

![task runner explorer](/assets/img/posts/gulp-dotnet-task-runner-explorer-binding-value-after-clean.png)

ok we are done with ass tasks, let's go to javascript tasks. I'll tell it very quickly.

first, install below packages:
```bash
npm install gulp-concat gulp-rename gulp-uglify --save-dev
```

then, require them in gulpe file

```javascript
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
```

and then add following task:

```javascript
const jsRoot = `./wwwroot/js`;
gulp.task('bundle:scripts', () => {
    return gulp.src(`${jsRoot}/**/*.js`)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(jsRoot))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsRoot));
});
```

this task gets all scripts and concatenates them into `bundle.js` and after that uglify it and create `bundle.min.js`.

lastly, we create a task to clean this generated files through build clean:
```javascript
gulp.task('clean:scripts', (callback) => {
    rimraf(`./wwwroot/js/bundle.js`, callback);
    rimraf(`./wwwroot/js/bundle.min.js`, callback);
});
```

then for having controll on all `clean` tasks, we create a `default` task to run all clean related task:
```javascript
gulp.task('default:clean', gulp.series(
    'clean:css',
    'clean:scripts'
));
```

here is the final `gulpfile.js`:

```
/// <binding AfterBuild='compile:sass, bundle:scripts' Clean='default:clean' ProjectOpened='watch:sass' />
let gulp = require('gulp');
let sass = require('gulp-sass');
let rimraf = require(`rimraf`);
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('compile:sass', () => {
    return gulp.src(`./wwwroot/scss/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./wwwroot/css/`))
});

gulp.task('watch:sass', () => {
    gulp.watch(`./wwwroot/scss/**/*.scss`, (done) => {
        gulp.series(['compile:sass'])(done);
    });
});

gulp.task('clean:css', (callback) => {
    rimraf(`./wwwroot/css/`, callback);
});

const jsRoot = `./wwwroot/js`;
gulp.task('bundle:scripts', () => {
    return gulp.src(`${jsRoot}/**/*.js`)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(jsRoot))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsRoot));
});

gulp.task('clean:scripts', (callback) => {
    rimraf(`./wwwroot/js/bundle.js`, callback);
    rimraf(`./wwwroot/js/bundle.min.js`, callback);
});


gulp.task('default:clean', gulp.series(
    'clean:css',
    'clean:scripts'
));
```

### Wrapping it up
We’ve gone through the absolute basics of Gulp and created a workflow that's able to compile Sass into CSS while watching Sass files for changes at the same time. We can run these tasks from `Task Runner Explorer`, beside we can run them with the gulp command in the command line, too.

We’ve also built a second task, `bundle:scripts`, that concatenate and uglify all js files in wwwroot.

Lastly, we have a clean task that clears away from the generated files and folder, allowing us to remove any old files that were inadvertently kept.

