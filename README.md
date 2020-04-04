# ßoilerplate

A modular framework for NodeJS based applications.

## What kind of sorcery is this?

On one hand the `ß` object, with the modular loader mechanism. The code is defined in the boilerplate/loader folder.  
On the other hand the boilerplate for your application - the stack you start with, that will be customized. Defined by modules that are loaded with the boilerplate loader.  

## What is it good for? Why should I need this? Why am I reading this?

On one hand this is a method to reduce complexity, to organize code, to put it to a reuseable form, to create your own modules, to have a structure.
On the other hand a starting point with some common features already implemented. Several stacks exist already, and it is not too difficoult to start a new stack.

You may need something like that if you have several projects that have some common code, and you don't want to re-implement everything all the time.

### ß - I usually say "the boiler-variable", or it can be called Eszett (IPA: [ɛsˈtsɛt]) or "Sharp S" - a global variable.

Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this special character, never used anywhere else as far as I know.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).

### The boilerplate itself is a modular structure to start a project with. 

The first implementation of a full stack, `@ng-modules` used MongoDB, Express, AngularJS, NodeJS, Passport, and some others. It is now outdated.
`@codepad-modules` implements codepad, a collaborative browser based online IDE that we use.
Frontend `@vue-modules` along with the `@server-modules` backend is a modern Vue based fullstack. `@vuekit-modules` is a minimal non-webpacked version to try things quickly.
The list goes on, so for the actual list you should check what 'factory' modules we provide. 

Take a look at the modules to get the idea how things can be achived. Once the whole thing is started you actually have something you can extend, override, and build further.
As a core concept, you can override any part of the code, by design its just a skeleton.

To explain the philosophy a bit better, a project get's unique as files are added and eventually re-defined.  
There are two kinds of modules, custom modules with priority and factory modules that have parent folders starting with the `@` character.
A project may have a module in both of these folders, in that case if a file is present in a custom module, it has priority over the factory module. 
It can even happen that functionality is split up in two stack folders. Functionality is then built up by the module loader system, honoring your priority modules.

Let me give you an example. In a project instance we have a `modules` folder containing the `app` module, which also has a symlinked file in `@vue-modules`, called `index.html`.
In that case this file defines the index page for the project, and the one from our project overrides the default. Every function, every hook, every frontend file, everything can be customized.

Note: CWD is a module itself as well.

## Getting Started

Download / mount / Clone the git repo into folder where you want to start your project. We usually use `/srv/codepad-project`, since we are working with codepad. 

You can make, no, you should make the boilerplate folder readonly, and create at least one `modules` folder to put your own modules and override existing modules or parts of existing modules.
It is not recommended to modify the boilerplate content in your project! Any file that is placed properly outside of the boilerplate folder in the project folder, will override the file while loading.

So, an example of the structure would be:
```
/srv/codepad-project  # the project folder (CWD)
/srv/codepad-project/boilerplate   # the readonly folder (BPD)
/srv/codepad-project/@somestack-modules   # contains symlinks to the readonly modules used
/srv/codepad-project/mycustom-modules   # the custom modules for the project (with priority over @-modules)
/srv/codepad-project/configs   # the project configuration files (initially generated automatically)
/srv/codepad-project/var/debug   # runtime files, and a debug folder where the boot process can be debugged
...
```

## Running the installer

Well, I use red Hat based systems so if you know what DNF is, you can run the installer.
You will need NodeJS and npm of course. There are some npm.sh files in the modules, these will install the node_modules of the ß-modules.
NOTE: `modules` are ßoilerplat modules, and `node_modules` are npm packaged modules. Unfortunatley npm has no standard for example for location of publicly visible files in a web project. Some npm modules use a `/dist` folder, while some others use some different folder, so we need to crate wrapper modules to define express routes, or our stack might use possibly webpack. The point is, `node_modules` are not to be confused with ß-modules.

You can start your project with `push.sh`, an advanced script that uses system scope, `ß start` or the most simple `node server.js` - pre-defined constants or variables can be added there.

## What modules are used.

In addition to the modules folder, all folders in the working directory that have 'modules' in their name will be considered as a set of modules. (Except `node_modules`)
They are processed sequentially, however if a modules folder is prefixed with `@` it will be considered a boilerplate factory module, and has lower priority as the other modules. 
A module-condition.js file if present, has to evalute to true. A list of modules is printed into `/var/boilerplate/debug` 

## Other special characters

if you see this:
```
ł(some_vairable, or_two_variables); // mostly same as console.log
Ł(that, or_what, something); // extended logs with info on where it happened
```
Don't panik. These two are just logging functions, mainly used in development.

```
đ(err); // not so fatal, log and continiue
Đ(error); // fatal error, log and throw
```

Don't panik either. These two are the determinator and the detonator functions, that handle errors.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



[`README.EN.md:1`](https://anima.d250.hu:9001/p/boilerplate/README.EN.md?line=1)

The `/global` folder in a module should contain simple scripts to attach values to the global `ß` namespace.


[`boot.js:9`](https://anima.d250.hu:9001/p/boilerplate/loader/boot.js?line=9)

The `/local` may contain pre-defined code which is loaded before libs are loaded. Factory should not have any local folder, it is project-specific code.


[`boot.js:11`](https://anima.d250.hu:9001/p/boilerplate/loader/boot.js?line=11)

After the global `ß` values are set, libs and hooks are loaded.


[`boot.js:13`](https://anima.d250.hu:9001/p/boilerplate/loader/boot.js?line=13)

## THE ß object  
  
The boilerplate module framework uses a "ß namespace" to store constants and references to functions across it's modules.    
This namespace is attached to the `ß` primary global variable, visible in the global scope. Frequently used node modules can be attached directly.  
You can pre-create the ß variable in your server.js file before loading the boilerplate, to pre-define functions variables and constants.  
  
A custom `server.js` with debug-mode may look like this.    
```  
// Pre-declare ß so constants and functions can be attached.  
global.ß = {};  
// Set the DEBUG constant to true  
ß.DEBUG = true;  
```  
The entry point to boot the framework is then: `require("./boilerplate");`


[`bp.js:5`](https://anima.d250.hu:9001/p/boilerplate/loader/bp.js?line=5)

We can debug the namespace by writing a  debug file. `ß.debug_namespace` will by default write the file to  `ß.VAR /debug/boiler-namespace.txt`


[`bp.js:43`](https://anima.d250.hu:9001/p/boilerplate/loader/bp.js?line=43)

To use the `ß` namespace in files outside of the framework, we export it in es5 and es6 formats. Arrays dont work, but objects do.


[`bp.js:62`](https://anima.d250.hu:9001/p/boilerplate/loader/bp.js?line=62)

By convention, uppercase variables are considered exportable-constants


[`bp.js:78`](https://anima.d250.hu:9001/p/boilerplate/loader/bp.js?line=78)

The `uncaughtException` handler, determinator `đ` and detonator `Đ` functions, as well as the calling sourcefile field of the logging function `Ł` has file paths converted to ansi links by default in non-production mode.  
   Conversation takes place and can be customized by pre-defining boilerplate constants and functions.


[`det.js:21`](https://anima.d250.hu:9001/p/boilerplate/loader/det.js?line=21)

## Logging, Throwing  
### Catched exceptions  
`uncaughtException` is captured and displayed with enhanced formatting.


[`det.js:94`](https://anima.d250.hu:9001/p/boilerplate/loader/det.js?line=94)

leadnull is a superglobal function. Usage: `ł(obj, 'foo.bar')`


[`det.js:108`](https://anima.d250.hu:9001/p/boilerplate/loader/det.js?line=108)

```  
  
// Demonstration of the leadnull ł function  
  
var a = {};  
a.b = {};  
a.b.c = {};  
a.b.c.d = {};  
  
a.b.c.d.value = "Hello ł";  
  
let test1 = ł(a, "b.c.d.value");  
let test2 = ł(a, "b.x.d.value");  
  
let a3 = "String";  
let bx = false;  
let test3 = ł(a3, "b.x.d.value");  
let test4 = ł(a, bx);  
  
Ł(a.b.c.d.value, test1, test2, test3, test4);  
  
/* returns  
  
┠─ Hello ł   // correct access of nested objects  
┠─ Hello ł   // access the correct object via ł  
┠─ undefined // access an undefined object at ł  
┠─ null      // wrong first argument  
┠─ null      // wrong second argument  
  
Wrong use of ł, first argument is not an object in at Object.<anonymous> (/srv/codepad-project/demo.js:33:13)  
Wrong use of ł, second argument is not a string in at Object.<anonymous> (/srv/codepad-project/demo.js:34:13)  
  
```


[`det.js:110`](https://anima.d250.hu:9001/p/boilerplate/loader/det.js?line=110)

### Superglobal Logging `Ł` function to be used during development  
Place temporary `console.log()`-like function with short special character, they can be tracked down easyly within the project.    
`Ł()` is an enhanced `console.log` that prints it's arguments in seperate lines, and indicates when and where it has been called from.   
It is very useful while development, to analize objects and variables in the code. Production-ready code should not contain this logging helper.


[`det.js:182`](https://anima.d250.hu:9001/p/boilerplate/loader/det.js?line=182)

### Global  determinator `đ` and the detonator `Đ` error-handlers.  
Should the determinator function `đ(err);` recieve an error as argument, it will log the error, then execution will continiue.  
On the other hand the detonator `Đ(err);` will log the error and exit the current process.  
Both functions can be part of production-ready code, but encountering them indicates an error.


[`det.js:201`](https://anima.d250.hu:9001/p/boilerplate/loader/det.js?line=201)

In async functions we can `await` for `ß` variables to be defined.  
   `await ß.isDefined('boilerplate_variable');`


[`es2017.js:1`](https://anima.d250.hu:9001/p/boilerplate/loader/es2017.js?line=1)

`ß.spawn_command` will execute a single bash command via `child_process.spawn`


[`exec.js:5`](https://anima.d250.hu:9001/p/boilerplate/loader/exec.js?line=5)

## Module dir forking  
  
A js file can be executed, or better said forked:  
`ß.fork_file(file, name, argv, option)` this will call `child_process.fork()`.


[`fork.js:5`](https://anima.d250.hu:9001/p/boilerplate/loader/fork.js?line=5)

The fork folder in a module is a folder containing js files to be forked at startup.    
It will fork all the files in this folder, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority in case of name collision.  
Each forked process will have it's PID, stderr and stdout in files at `ß.VAR /debug`  
`  
/fork  
`  
A module may define additional folders containing files to be forked.


[`fork.js:104`](https://anima.d250.hu:9001/p/boilerplate/loader/fork.js?line=104)

`ß.fs` is reference to the [fs-extra](https://github.com/jprichardson/node-fs-extra) package   
Instead of `fs = require('fs');` you can use `ß.fs` directly, use `mkdirp`, and `readJson` and other handy functions.


[`fs.js:1`](https://anima.d250.hu:9001/p/boilerplate/loader/fs.js?line=1)

`ß.path` is the native path


[`fs.js:5`](https://anima.d250.hu:9001/p/boilerplate/loader/fs.js?line=5)

`fs.isDirSync` and `fs.isFileSync` are some extra function to check if they exists for real. The only argument is the path. Works with symlinked paths.


[`fs.js:12`](https://anima.d250.hu:9001/p/boilerplate/loader/fs.js?line=12)

`fs.inPathsSync` will give all entries, `fs.inFilesSync` all files and `fs.inDirsSync` all folder.   
First argument is the path, second is the function to be called on each result items. The processor function works with a single argument, the result itself.


[`fs.js:29`](https://anima.d250.hu:9001/p/boilerplate/loader/fs.js?line=29)

`ß.fs.traverse_path_process_files` is a recursive sync function that will process all files starting with the given path.


[`fs.js:82`](https://anima.d250.hu:9001/p/boilerplate/loader/fs.js?line=82)

## Module hooks  
Hooks are similar to lib-functions, however, multiple hooks from multiple modules are called when calling `ß.run_hook`.  
Hooks are defined with `module.exports = function(arguments)` within js files with the naming schema `module/hooks/hookname.function-name.js`  
The hookname is the reference for the call, the function-name should be a descriptive custom name, programatically not used.  
As always, hooks definied within the project-modules take precedence over @boilerplate-modules. Hooks may have multiple arguments.  
A development-debug log is generated in the `ß.VAR` directory.


[`hook.js:7`](https://anima.d250.hu:9001/p/boilerplate/loader/hook.js?line=7)

## Constants  
  
`ß.DEBUG` is a boolean constant  
`ß.HOSTNAME` should be the FQDN hostname    
`ß.MRD` is the module root directory


[`init.js:1`](https://anima.d250.hu:9001/p/boilerplate/loader/init.js?line=1)

`ß.CWD` stands for the Current Work Directory and refers to the project root.


[`init.js:20`](https://anima.d250.hu:9001/p/boilerplate/loader/init.js?line=20)

`ß.NAME` is a project name, by default the parent folder name of `CWD`


[`init.js:23`](https://anima.d250.hu:9001/p/boilerplate/loader/init.js?line=23)

`ß.BPD` is the Boilerplate Directory


[`init.js:33`](https://anima.d250.hu:9001/p/boilerplate/loader/init.js?line=33)

`CWD` should contain a `/version` file containing the build number as string. This should be incremented in every build.


[`init.js:36`](https://anima.d250.hu:9001/p/boilerplate/loader/init.js?line=36)

## Lablib - builtin logging  
  
There are six builtin logging functions in the ß namespace, that have ansi colors when colorised-logging is enabled in development.    
These logs are written to the console, and a file.   
  
Application-logic logs that may be used by admins.  
  
`ß.log()` a gray logmessage  
`ß.msg()` logs a green message    
`ß.ntc()` a yellow notice    
`ß.err()` red error message    
  
Development-logic logs, to be used in programming.  
  
`ß.error()` red error that does not appear in application logs    
`ß.debug()` only if debug mode is enabled, logs with a blue line    
`ß.logfs()` logs to the filesystem only, to the var/debug folder  
  
The variable `ß.LOGPATH` can be set to any folder accessible by the application. Each of the ß logging functions will append an enty here.  
Coloring is disabled in production, so that syslog and other logging tools can process logs without noise.


[`lablib.js:14`](https://anima.d250.hu:9001/p/boilerplate/loader/lablib.js?line=14)

## Module libs  
  
Each module may have a `/lib` folder with js files, each file containing a single function automatically exposed on the `ß.lib` namespace.   
Such a function should be defined with `module.exports = function(arguments) {}`  
These are then named by their filename and can be referred with `ß.lib.modulename.functionname` (namespaced with module names) or `ß.lib.functionname` (direct lib namespace)  
lib-function files in `@-modules` have lower precedence over custom modules, thus if defined with priority, they will be overridden.  
The function-defining js files may contain private local variables and functions, and any number of arguments.


[`lib.js:7`](https://anima.d250.hu:9001/p/boilerplate/loader/lib.js?line=7)

## Module dir loading  
There is a command to `require()` all files in a dir of all modules.    
This is done by passing a 'dir' name as an argument to `ß.load();`.   
It will load all the files in this, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority.  
Some folders that are loaded by the framework:  
`  
/init  
/server  
/routes (via server/server.js)  
/start  
/debug (only if debug mode is on)  
`


[`load.js:5`](https://anima.d250.hu:9001/p/boilerplate/loader/load.js?line=5)

by default the logger object is the console, but we can use other loggers too, eg files.


[`logger.js:2`](https://anima.d250.hu:9001/p/boilerplate/loader/logger.js?line=2)

## ßoilerplate/global/modules.js  
  `ß.modules` contains all the modules that we use  
Via `USE_MODULENAME = false`, we can de-activate modules, and/or query if the module is used.  
   However, it is rather recommended to create module sets, that means folders containing modules (or symlinks to modules).


[`modules.js:4`](https://anima.d250.hu:9001/p/boilerplate/loader/modules.js?line=4)

`CWD` itself is a primary module with priority.


[`modules.js:14`](https://anima.d250.hu:9001/p/boilerplate/loader/modules.js?line=14)

`ß.load_modules(modules_root)` will load all modules located in that directory. loaded modules will be added to 'ß.modules' and processed at all further steps of the boilerplate-loader


[`modules.js:64`](https://anima.d250.hu:9001/p/boilerplate/loader/modules.js?line=64)

Module folders either have priority or not. If there is no @ character prefixing the directory, it has priority, therefore 'factory' libs should be prefixed with @ and can be symlinks.  
           Module folders are are `modules` or folders that end with `*-modules`.


[`modules.js:73`](https://anima.d250.hu:9001/p/boilerplate/loader/modules.js?line=73)

the `ß.debug_modules()` function will write two files, so that the loaded modules can be debugged.


[`modules.js:101`](https://anima.d250.hu:9001/p/boilerplate/loader/modules.js?line=101)

resolve the path for a npm node_module with `ß.resolve_node_module_path(node_module [,paths])`  
While processing all arguments will be joined together and appended to the `node_module` we are looking for.


[`modules.js:178`](https://anima.d250.hu:9001/p/boilerplate/loader/modules.js?line=178)

you may specify your superglobal node modules, like underscore, or async.js in the `node_modules.js` file in your project-root (`CWD`).


[`node_modules.js:6`](https://anima.d250.hu:9001/p/boilerplate/loader/node_modules.js?line=6)

## ßoilerplate timestamp functions  
Simple date functions    
`ß.now()` returns yyyy-mm-dd hh:mm:ss format    
`ß.date()` returns yyyy-mm-dd format    
`ß.time()` returns dd hh:mm:ss format    
`ß.DATE` and `ß.TIME` are constant stamps created at bootup


[`now.js:3`](https://anima.d250.hu:9001/p/boilerplate/loader/now.js?line=3)

as an application we write our pid to a file


[`pid.js:11`](https://anima.d250.hu:9001/p/boilerplate/loader/pid.js?line=11)

The signal `SIGUSR1` will restart the server process.


[`process.js:15`](https://anima.d250.hu:9001/p/boilerplate/loader/process.js?line=15)

## Module dir loading  
  
The framework has internal methods for sh, js file and command execution.  
  
To execute bash files in modules pass a 'filename' as an argument to `ß.exec();`.   
It will run files matching this filename, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority.  
Note that the implementation contains both sync and async elements, and does not return any values, but logs into the `var` folder.  
These methods are used in the installation process for example. The following files get executed in each of the modules, if they exists:  
```  
install.sh  
dnf.sh  
npm.sh  
```


[`spawn.js:3`](https://anima.d250.hu:9001/p/boilerplate/loader/spawn.js?line=3)

`ß.spawn_command` will execute a single bash command via `child_process.spawn`


[`spawn.js:23`](https://anima.d250.hu:9001/p/boilerplate/loader/spawn.js?line=23)

`ß.bash_file` will execute a single bash file via `child_process.spawn`


[`spawn.js:59`](https://anima.d250.hu:9001/p/boilerplate/loader/spawn.js?line=59)

## symlinks  
`ß.link` is a function to symlink a source path to a destination path. it will check if this is a legal command, and return if not.   
Underlying directories will be created.


[`symlink.js:5`](https://anima.d250.hu:9001/p/boilerplate/loader/symlink.js?line=5)

The `ß.uplink` function will symlink everything that a folder has to a new real folder


[`symlink.js:25`](https://anima.d250.hu:9001/p/boilerplate/loader/symlink.js?line=25)

# Module's Documentation

## The codepad-project module
#### 
Entry point of the admin area


[`admin.js:2`](https://anima.d250.hu:9001/p/var/vue/en/src/admin.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`admin.js:16`](https://anima.d250.hu:9001/p/var/vue/en/src/admin.js?line=16)

UPDATE this._vm.$socket.emit has to be replaced with this._vm.$socket.client.emit


[`disabled_store.js:10`](https://anima.d250.hu:9001/p/var/vue/en/src/disabled_store.js?line=10)

Entry point of the frontend is main.js


[`main.js:2`](https://anima.d250.hu:9001/p/var/vue/en/src/main.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`main.js:15`](https://anima.d250.hu:9001/p/var/vue/en/src/main.js?line=15)

Use a /static file in a template  
<img :src="$app.uri('/some.svg')" height="200px">  
  
Use an asset file in a template  
<img :src="require('@/assets/some.svg')" height="200px">


[`main.js:59`](https://anima.d250.hu:9001/p/var/vue/en/src/main.js?line=59)

Entry point of the admin area


[`admin.js:2`](https://anima.d250.hu:9001/p/var/vue/hu/src/admin.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`admin.js:16`](https://anima.d250.hu:9001/p/var/vue/hu/src/admin.js?line=16)

UPDATE this._vm.$socket.emit has to be replaced with this._vm.$socket.client.emit


[`disabled_store.js:10`](https://anima.d250.hu:9001/p/var/vue/hu/src/disabled_store.js?line=10)

Entry point of the frontend is main.js


[`main.js:2`](https://anima.d250.hu:9001/p/var/vue/hu/src/main.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`main.js:15`](https://anima.d250.hu:9001/p/var/vue/hu/src/main.js?line=15)

Use a /static file in a template  
<img :src="$app.uri('/some.svg')" height="200px">  
  
Use an asset file in a template  
<img :src="require('@/assets/some.svg')" height="200px">


[`main.js:59`](https://anima.d250.hu:9001/p/var/vue/hu/src/main.js?line=59)

Entry point of the admin area


[`admin.js:2`](https://anima.d250.hu:9001/p/var/vue/src/admin.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`admin.js:16`](https://anima.d250.hu:9001/p/var/vue/src/admin.js?line=16)

UPDATE this._vm.$socket.emit has to be replaced with this._vm.$socket.client.emit


[`disabled_store.js:10`](https://anima.d250.hu:9001/p/var/vue/src/disabled_store.js?line=10)

Entry point of the frontend is main.js


[`main.js:2`](https://anima.d250.hu:9001/p/var/vue/src/main.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`main.js:15`](https://anima.d250.hu:9001/p/var/vue/src/main.js?line=15)

Use a /static file in a template  
<img :src="$app.uri('/some.svg')" height="200px">  
  
Use an asset file in a template  
<img :src="require('@/assets/some.svg')" height="200px">


[`main.js:59`](https://anima.d250.hu:9001/p/var/vue/src/main.js?line=59)

<pre>
@admin-modules
 - admin
 - ansi
 - logs
@javascript-modules
 - async
 - clouddata
 - clouddir
 - csvloader
 - devel_iframe
 - googleapis
 - jest
 - mikrotik
 - mime
 - moment
 - ping
 - rclone
@server-modules
 - admin
 - api
 - cors
 - favicon
 - logging
 - mongodb
 - mongoose
 - multilanguage
 - nodemailer
 - passport
 - passport_admin
 - passport_facebook
 - passport_google
 - passport_hash
 - readme
 - server
 - session
 - socketio
 - user_profile
 - verify
@vue-modules
 - app
 - bootstrap-vue
 - fontawesome5
 - jsoneditor
 - login
 - multilanguage
 - socketio
 - vue
 - vueinclude
 - vuetify
 - vuex
anima-modules
 - app
boilerplate
 - .gitignore
 - LICENSE.md
 - NOTES.md
 - README.EN.md
 - README.HU.md
 - cli.js
 - cli.sh
 - index.js
 - install
 - install-defaults.sh
 - install.sh
 - loader
 - publishlib.sh
 - pushlib.sh
 - start.sh
config
 - admin-passports.json
 - admin-passwords.json
 - connect-mongodb-session.json
 - mongodb.json
 - passport_facebook.json
 - passport_google.json
var
 - app
 - await
 - boilerplate.es5.js
 - boilerplate.es6.js
 - boilerplate.sh
 - codepad-project.modules.json
 - debug
 - debuglog.js
 - https-server.port
 - leadtoval.js
 - log
 - project.log
 - project.pid
 - push.log
 - vue
</pre>



## The app module
#### /anima-modules/app
<pre>
vue
 - form.vue
 - main.vue
 - navigation.vue
</pre>

## The @app module
#### /@vue-modules/app
Entry point of the frontend is main.js


[`main.js:2`](https://anima.d250.hu:9001/p/@vue-modules/app/vue/main.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`main.js:15`](https://anima.d250.hu:9001/p/@vue-modules/app/vue/main.js?line=15)

Use a /static file in a template  
<img :src="$app.uri('/some.svg')" height="200px">  
  
Use an asset file in a template  
<img :src="require('@/assets/some.svg')" height="200px">


[`main.js:59`](https://anima.d250.hu:9001/p/@vue-modules/app/vue/main.js?line=59)

<pre>
global
 - languages.js
 - main.js
 - pages.js
vue
 - App.vue
 - app-functions.js
 - en.html
 - hu.html
 - index.html
 - main.js
 - main.vue
 - navigation.vue
</pre>



## The @admin module
#### /@admin-modules/admin
The admin page will be available on the ```/admin``` uri.


[`pages.js:1`](https://anima.d250.hu:9001/p/@admin-modules/admin/global/pages.js?line=1)

Entry point of the admin area


[`admin.js:2`](https://anima.d250.hu:9001/p/@admin-modules/admin/vue/admin.js?line=2)

Socketio will only connect if a passport user is logged in. Override possible.


[`admin.js:16`](https://anima.d250.hu:9001/p/@admin-modules/admin/vue/admin.js?line=16)

<pre>
global
 - pages.js
hooks
 - adminsocket.messages.js
vue
 - Admin.vue
 - admin.html
 - admin.js
 - components
</pre>

## The @admin module
#### /@server-modules/admin
<pre>
express
 - admin.js
global
 - rewrites.js
index
 - admin-index.js
post-routes
 - admin.js
</pre>



## The @ansi module
#### /@admin-modules/ansi
<pre>
lib
 - html.js
</pre>



## The @logs module
#### /@admin-modules/logs
<pre>
global
 - logfile.js
hooks
 - socket.sendlog.js
lib
 - get_log_page.js
 - send_log.js
 - send_logline.js
 - send_logs.js
public
 - app.logsController.js
 - logs.ejs
routes
 - logs.js
start
 - logwatch.js
</pre>



## The @async module
#### /@javascript-modules/async
check https://caolan.github.io/async/v3/


[`async.js:1`](https://anima.d250.hu:9001/p/@javascript-modules/async/global/async.js?line=1)

<pre>
global
 - async.js
</pre>



## The @clouddata module
#### /@javascript-modules/clouddata
ß.CLOUDDIR is a an external source that can be used in the project, eg google drive or anything rclone can import. The clouddata module imports json files.


[`clouddata.js:1`](https://anima.d250.hu:9001/p/@javascript-modules/clouddata/init/clouddata.js?line=1)

The clouddir is scanned and files attached to ß.CLOUDDIR in objects based on their path


[`build.js:1`](https://anima.d250.hu:9001/p/@javascript-modules/clouddata/lib/build.js?line=1)

<pre>
init
 - clouddata.js
lib
 - build.js
</pre>



## The @clouddir module
#### /@javascript-modules/clouddir
ß.CLOUDDIR is a an external source that can be used in the project, eg google drive or anything rclone can import. Clouddir lists and serves files.


[`clouddir.js:1`](https://anima.d250.hu:9001/p/@javascript-modules/clouddir/init/clouddir.js?line=1)

The clouddir is scanned and files attached to ß.CLOUDDIR in objects based on their path


[`build.js:1`](https://anima.d250.hu:9001/p/@javascript-modules/clouddir/lib/build.js?line=1)

<pre>
express
 - serve-clouddir.js
init
 - clouddir.js
lib
 - build.js
routes
 - clouddir.js
</pre>



## The @csvloader module
#### /@javascript-modules/csvloader
<pre>
init
 - csvtojson.js
lib
 - csvtojson.js
 - csvtostring.js
 - csvtostringSync.js
</pre>



## The @devel_iframe module
#### /@javascript-modules/devel_iframe
<pre>
routes
 - devel.js
start
 - devel.js
</pre>



## The @jest module
#### /@javascript-modules/jest
<pre>
</pre>



## The @mikrotik module
#### /@javascript-modules/mikrotik
<pre>
routeros_scripts
 - enable-https.ros.sh
</pre>



## The @mime module
#### /@javascript-modules/mime
<pre>
lib
 - detect.js
</pre>



## The @moment module
#### /@javascript-modules/moment
<pre>
global
 - moment.js
</pre>



## The @ping module
#### /@javascript-modules/ping
<pre>
init
 - ping.js
start
 - ping.js
</pre>



## The @rclone module
#### /@javascript-modules/rclone
<pre>
</pre>



## The @api module
#### /@server-modules/api
<pre>
express
 - api.js
global
 - rewrites.js
post-routes
 - api.js
</pre>



## The @cors module
#### /@server-modules/cors
The cors module will allow express to use our API endpoints from several origings, eg. build and development.  
The default configs use https and the development webpack hot module replacement uses our default port 9000.


[`cors.js:1`](https://anima.d250.hu:9001/p/@server-modules/cors/express/cors.js?line=1)

<pre>
express
 - cors.js
</pre>



## The @favicon module
#### /@server-modules/favicon
If the project CWD contains a favicon.ico, it will be served as favicon, otherwise a default icon from the module is used.


[`favicon.js:3`](https://anima.d250.hu:9001/p/@server-modules/favicon/start/favicon.js?line=3)

<pre>
start
 - favicon.js
static
 - favicon.ico
</pre>



## The @logging module
#### /@server-modules/logging
Logging via morgan logger. By default we trust the proxy, and log to `VAR` log folder to a file marked with the startup date and time.


[`morgan.js:3`](https://anima.d250.hu:9001/p/@server-modules/logging/express/morgan.js?line=3)

<pre>
express
 - morgan.js
</pre>



## The @mongodb module
#### /@server-modules/mongodb
<pre>
</pre>



## The @mongoose module
#### /@server-modules/mongoose
If there is no config file for mongodb, the first startup will create one automatically.  
Seperate debug config - if exists - will be used in debug mode.  
The default host is 127.0.0.1


[`config_mongodb.js:3`](https://anima.d250.hu:9001/p/@server-modules/mongoose/lib/config_mongodb.js?line=3)

Mongodb is integrated with the mongoose module. In the init folder:  
   `ß.lib.mongoose.define('name'); // name is a collection name we define`  
   To keep the conventions we use the default common naming casings.  
   `ß[nameModel]` The model  
   `name_model + '/keys'` Scripts folder in modules to add keys to the model:   
   `ß[nameSchema]` The Schema  
   `name_model + '/methods'` Scripts folder in modules to add methods the the model   
   `ß[Name]` The mongoose model using name and nameSchema.  
   `ß.mongoose_collections` The array of collections we use  
   `ß.USE_DB_NAME` Constant for reference of used databases.


[`define.js:2`](https://anima.d250.hu:9001/p/@server-modules/mongoose/lib/define.js?line=2)

At startup, a backup script is generated.


[`db.js:3`](https://anima.d250.hu:9001/p/@server-modules/mongoose/start/db.js?line=3)

<pre>
global
 - mongoose.js
init
 - mongoose.js
lib
 - config_mongodb.js
 - define.js
mongo-scripts
 - dropall.js
 - showall.js
start
 - db.js
</pre>



## The @multilanguage module
#### /@server-modules/multilanguage
The language module can be used to create multilingual page versions, with inline translations.  
This has been implemented for simple bilingual apps, where english and other languages shall be supported.  
The locale specific versions are then rendered for each language in the build process.  
  
The `ß.DEFAULT_LANG` variable defines what language should be used, in a fallback to a default.


[`default.js:1`](https://anima.d250.hu:9001/p/@server-modules/multilanguage/global/default.js?line=1)

We guess the language the user prefers by the request accepted languages list.


[`lang.js:1`](https://anima.d250.hu:9001/p/@server-modules/multilanguage/lib/lang.js?line=1)

A string or document might be processed by the language module.    
   The process will then discard irrelevant language chunks, and select the selected ones for the specific language.    
     
   The following string will be rendered as 'Hello world' in english and hungarian languages.  
   `##&en Hello World! ##&hu Hello Világ! ##`


[`process.js:1`](https://anima.d250.hu:9001/p/@server-modules/multilanguage/lib/process.js?line=1)

The `user.lang` is stored in the user database.


[`language-keys.js:1`](https://anima.d250.hu:9001/p/@server-modules/multilanguage/user_model/keys/language-keys.js?line=1)

<pre>
global
 - default.js
lib
 - lang.js
 - process.js
 - translate.js
pre-routes
 - sessionlang.js
routes
 - get-data-file.js
 - post-lang.js
user_model
 - keys
</pre>

## The @multilanguage module
#### /@vue-modules/multilanguage
We create seperate webpack packers so that we have all languages statically translated.


[`vue-build-languages.js:1`](https://anima.d250.hu:9001/p/@vue-modules/multilanguage/fork/vue-build-languages.js?line=1)

each language will have it's own src folder for the vue build process


[`vue-init-languages.js:1`](https://anima.d250.hu:9001/p/@vue-modules/multilanguage/init/vue-init-languages.js?line=1)

Express middleware to make sure the right index page is served when requesting


[`index-pages.js:1`](https://anima.d250.hu:9001/p/@vue-modules/multilanguage/pre-index/index-pages.js?line=1)

Each nlanguage needs a vue-cli webpack configuration as well.


[`vue-config.js:1`](https://anima.d250.hu:9001/p/@vue-modules/multilanguage/start/vue-config.js?line=1)

<pre>
fork
 - vue-build-languages.js
init
 - language-pages.js
 - vue-init-languages.js
pre-index
 - index-pages.js
start
 - vue-config.js
vue
 - components
</pre>



## The @nodemailer module
#### /@server-modules/nodemailer
The nodemailer module allows to send mail from the backend, via localhost port 25 by default.


[`transporter.js:3`](https://anima.d250.hu:9001/p/@server-modules/nodemailer/init/transporter.js?line=3)

<pre>
init
 - transporter.js
</pre>



## The @passport module
#### /@server-modules/passport
When the user changes the languge, his preference is saved


[`update_user_lang.set_session.js:1`](https://anima.d250.hu:9001/p/@server-modules/passport/hooks/update_user_lang.set_session.js?line=1)

This module defines the User mongo database;


[`user.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/init/user.js?line=3)

The lib-function `ß.lib.passport.isLoggedIn(req, res, next)` checks if the user is authenticated or not.  
   It can be used as express middleware.


[`isLoggedIn.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/lib/isLoggedIn.js?line=3)

The local strategy is responsible for the email-password based login.


[`local.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/passport/local.js?line=3)

The `post-delete-account.json` requests deletes the user completley from the User database.


[`post-delete-account.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/routes/post-delete-account.js?line=3)

The `post-email.json` request checks if the given email address is a valid SMTP reciever.


[`post-email.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/routes/post-email.js?line=3)

The `post-login.json` request is responsible to log users in via email, password, and rem payload.


[`post-login.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/routes/post-login.js?line=3)

The `post-logout.json` route destroys the user session.


[`post-logout.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/routes/post-logout.js?line=3)

The `post-password-update.json` request


[`post-password-update.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport/routes/post-password-update.js?line=3)

<pre>
express
 - passport.js
global
 - passport.js
hooks
 - update_user_lang.set_session.js
init
 - serialization.js
 - user.js
lib
 - create_user.js
 - delete.js
 - ensure_user.js
 - get_password.js
 - isLoggedIn.js
 - login.js
 - login_delay.js
passport
 - local.js
routes
 - logout.js
 - post-delete-account.js
 - post-email.js
 - post-login.js
 - post-logout.js
 - post-password-update.js
start
 - socketio_user.js
user_model
 - keys
 - methods
</pre>



## The @passport_admin module
#### /@server-modules/passport_admin
The hook function for `socket.emit('admin-delete-user', id)` deletes the appropriate user by the given id.  
   If the id belongs to an admin then it won't be removed, otherwise the user will be deleted.  
   In the end updated users are emitted back via `socket.emit('users', data)`.


[`adminsocket.delete-user.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.delete-user.js?line=3)

The hook function for `socket.emit('get-users', arg)` finds the appropriate user/users by the given argument and emits these users back via `socket.emit('users', data)`.


[`adminsocket.get-users.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.get-users.js?line=3)

The hook function for `socket.emit('admin-save-user-profile', data)` updates the given user profile, billing and shipping informations on the profile page.


[`adminsocket.save-user-profile.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.save-user-profile.js?line=3)

The hook function for `socket.emit('admin-save-user', data)` saves and updates the given user datas.  
   This searches for the user by `data._id`.


[`adminsocket.save-user.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.save-user.js?line=3)

The lib-function `ß.lib.passport_admin.check_if_admin(id)` checks if the user with the given passport id has admin-level permissions on the website.  
Those id's can be set in the `config/admin-passports.json` file or, in debug mode if the file exists `config/admin-passports.debug.json` is used.


[`check_if_admin.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/lib/check_if_admin.js?line=3)

The lib-function `ß.lib.passport_admin.isLoggedInAdmin(req, res, next)` checks whether the authenticated user is either admin or not.   
   If the user is not authenticated as admin then redirect to the login page, or inform about the failure.


[`isLoggedInAdmin.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/lib/isLoggedInAdmin.js?line=3)

The lib-function `ß.lib.admin.is_master_password(password)` checks whether the given password is listed in the passwords config file `config/admin-passwords.json`.  
   Note that there is no username associated with the password, the admin user has access right to every passport id account.  
   The password listed here should be very hard to guess.


[`is_master_password.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_admin/lib/is_master_password.js?line=3)

<pre>
hooks
 - adminsocket.delete-user.js
 - adminsocket.get-users.js
 - adminsocket.save-user-profile.js
 - adminsocket.save-user.js
 - session.is_admin.js
lib
 - check_if_admin.js
 - isLoggedInAdmin.js
 - is_master_password.js
</pre>



## The @passport_facebook module
#### /@server-modules/passport_facebook
The lib function `ß.lib.passport_facebook.config_auth()` loads or sets the appropriate facebook passport config file.  
   The settings can be set in `config/passport_facebook.json` or `config/passport_facebook.debug.json`.  
   To get passport-facebook to work, there needs to be a facebook app, and the config shall contains the secret-app-ID, the app-secret, and which data fields are required by the app.  
   Under the hood, we use [passport-facebook](https://github.com/jaredhanson/passport-facebook).


[`config_auth.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_facebook/lib/config_auth.js?line=3)

<pre>
lib
 - config_auth.js
passport
 - facebook.js
routes
 - auth-facebook-callback.js
 - auth-facebook.js
 - connect-facebook-callback.js
 - connect-facebook.js
 - unlink-facebook.js
user_model
 - keys
</pre>



## The @passport_google module
#### /@server-modules/passport_google
The lib function `ß.lib.passport_google.config_auth()` loads or sets the appropriate google passport file.  
   The settings can be set in `/config/passport_google.json` or in `/config/passport_google.debug.json`.  
   To get passport-google to work, you should have a clientID, clientSecret and the callbackURL. These can be obtained from [Google Developers Console](https://console.developers.google.com/).   
   We use [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth).


[`config_auth.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_google/lib/config_auth.js?line=3)

<pre>
lib
 - config_auth.js
passport
 - google.js
routes
 - auth-google-callback.js
 - auth-google.js
 - connect-google-callback.js
 - connect-google.js
 - unlink-google.js
user_model
 - keys
</pre>



## The @passport_hash module
#### /@server-modules/passport_hash
The `post-email-request.json` request creates a new user if ncessery, and sends out an email.


[`post-email-request.js:3`](https://anima.d250.hu:9001/p/@server-modules/passport_hash/routes/post-email-request.js?line=3)

<pre>
hooks
 - user_registration.send_hash.js
lib
 - hash.js
 - okey_today.js
 - send.js
 - verify.js
passport
 - hash.js
routes
 - hash.js
 - post-email-request.js
 - post-email-update.js
</pre>



## The @readme module
#### /@server-modules/readme
The README for the project is served under the `/README.html` url.


[`readme.js:7`](https://anima.d250.hu:9001/p/@server-modules/readme/routes/readme.js?line=7)

This module generates a readme automatically from comments that are marked with the `@DOC` tag at start.  
   Both, single-line and multiline comments are supported. When the project is started source files are parsed and marked document comment blocks extracted.


[`autodoc.js:3`](https://anima.d250.hu:9001/p/@server-modules/readme/start/autodoc.js?line=3)

<pre>
routes
 - readme.js
start
 - autodoc.js
static
 - github-markdown.css
</pre>



## The @server module
#### /@server-modules/server
Static assets like css files can be placed in any module or the project root, in a /static folder


[`serve_static.js:3`](https://anima.d250.hu:9001/p/@server-modules/server/express/serve_static.js?line=3)

Data representing assets like json files can be placed in any module or the project root, in a /data folder


[`serve_static.js:8`](https://anima.d250.hu:9001/p/@server-modules/server/express/serve_static.js?line=8)

## Express  
Express is used by default in development mode, with the default Cache-Control max-age 0.    
If the `ß.STATIC_OPTIONS` is `undefined` at inicialization, it will set max-age to 24h if production env. var is set.    
Therefore, it is recommended to use `ß.STATIC_OPTIONS` for express static server routes.


[`app.js:6`](https://anima.d250.hu:9001/p/@server-modules/server/global/app.js?line=6)

We set the number of spaces for indentation to two in nn-production mode for better readability


[`app.js:23`](https://anima.d250.hu:9001/p/@server-modules/server/global/app.js?line=23)

The `server` module uses express as https server


[`https-server.js:35`](https://anima.d250.hu:9001/p/@server-modules/server/server/https-server.js?line=35)

<pre>
cert
 - localhost-cert-config.txt
 - localhost.crt
 - localhost.csr
 - localhost.key
 - localhost.org.pem
 - make-cert.sh
express
 - app-api.js
 - bodyparser.js
 - compression.js
 - ejs.js
 - serve_static.js
 - static.js
global
 - app.js
init
 - await-https-server.js
lib
 - load_credentials.js
 - requestRulesMatch.js
 - rewrites.js
 - serve_files.js
 - serve_static.js
post-index
 - 404.js
 - 500.js
routes
 - restart_server_process.js
server
 - export-boilerplate-variables.js
 - https-server.js
</pre>



## The @session module
#### /@server-modules/session
The session data can be accessed by the frontend on the `session.json` uri.


[`session.js:3`](https://anima.d250.hu:9001/p/@server-modules/session/routes/session.js?line=3)

<pre>
global
 - sessionMiddleware.js
hooks
 - load_app.session.js
 - load_socketio_complete.init_sessionMiddleware.js
 - socket.session-data.js
lib
 - config_mongodb.js
 - update_user.js
routes
 - post-session-data.js
 - session.js
</pre>



## The @socketio module
#### /@server-modules/socketio
<pre>
hooks
 - load_server.socketio.js
</pre>

## The @socketio module
#### /@vue-modules/socketio
<pre>
hooks
 - socket.hello_socket_io.js
vue
 - assets
 - components
</pre>



## The @user_profile module
#### /@server-modules/user_profile
<pre>
hooks
 - update_profile.with_object.js
lib
 - update.js
routes
 - post_update_user_profile.js
user_model
 - keys
 - methods
</pre>



## The @verify module
#### /@server-modules/verify
The verify module's email-verify checks the validation of email addresses via SMTP connection.  
It fails if there is no domain, or no address that can recieve a message.


[`email.js:3`](https://anima.d250.hu:9001/p/@server-modules/verify/lib/email.js?line=3)

<pre>
lib
 - email.js
</pre>



## The @bootstrap-vue module
#### /@vue-modules/bootstrap-vue
<pre>
vue
 - components
</pre>



## The @fontawesome5 module
#### /@vue-modules/fontawesome5
<pre>
init
 - vuetify-fa.js
</pre>



## The @jsoneditor module
#### /@vue-modules/jsoneditor
<pre>
</pre>



## The @login module
#### /@vue-modules/login
<pre>
vue
 - assets
 - components
</pre>



## The @vue module
#### /@vue-modules/vue
vue build runs as a forked process


[`vue-build.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/fork/vue-build.js?line=1)

vue inspect is disabled by default, but can be enabled for analisation


[`vue-inspect.js:17`](https://anima.d250.hu:9001/p/@vue-modules/vue/fork/vue-inspect.js?line=17)

vue serve runs as a forked process


[`vue-serve.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/fork/vue-serve.js?line=1)

we create a `ß.vue_modules` object, which is a subset of `ß.modules`.


[`vue-modules.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/global/vue-modules.js?line=1)

The built files will reside in `ß.VAR/app`


[`index.js:3`](https://anima.d250.hu:9001/p/@vue-modules/vue/index/index.js?line=3)

The vue source tree is built up at the init stage


[`vue-init.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/init/vue-init.js?line=1)

We need our detagger, a fake module for webpack. It will expose our `ß.lib.multilanguage.process` function.


[`vue-init.js:4`](https://anima.d250.hu:9001/p/@vue-modules/vue/init/vue-init.js?line=4)

The vue source tree contains symlinks to the real files of the project - based on the modules used.


[`uplink_source_tree.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/lib/uplink_source_tree.js?line=1)

Based on `ß.vue_modules` we create a subset of node modules for vue


[`uplink_source_tree.js:38`](https://anima.d250.hu:9001/p/@vue-modules/vue/lib/uplink_source_tree.js?line=38)

The `src` folder is actually a unified version of all vue folders


[`uplink_source_tree.js:41`](https://anima.d250.hu:9001/p/@vue-modules/vue/lib/uplink_source_tree.js?line=41)

The default index build is a single-language, but has hot reload for development. It will work with symlinks to the original sourcefiles. Push needed if the file-structure changes.


[`vue-config.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/start/vue-config.js?line=1)

The `Ł` debug function has been implemented for the vue frontend!


[`vue-debuglog.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vue/start/vue-debuglog.js?line=1)

The most important variables are also exported vie the vue-cli env file


[`vue-env.js:3`](https://anima.d250.hu:9001/p/@vue-modules/vue/start/vue-env.js?line=3)

UPDATE this._vm.$socket.emit has to be replaced with this._vm.$socket.client.emit


[`disabled_store.js:10`](https://anima.d250.hu:9001/p/@vue-modules/vue/vue/disabled_store.js?line=10)

<pre>
fork
 - vue-build.js
 - vue-inspect.js
 - vue-serve.js
global
 - var-vue.js
 - vue-modules.js
index
 - index.js
init
 - await-vue-build.js
 - vue-init.js
lib
 - uplink_source_tree.js
start
 - vue-config.js
 - vue-debuglog.js
 - vue-env.js
 - vue-files.js
 - vue-leadtoval.js
vue
 - assets
 - components
 - disabled_store.js
 - router.js
</pre>



## The @vueinclude module
#### /@vue-modules/vueinclude
At the project boot process the var/vue-include folder is processed, txt, html, csv files are pre-processed.


[`build.js:3`](https://anima.d250.hu:9001/p/@vue-modules/vueinclude/lib/build.js?line=3)

clouddir html files are prepared for vue, by parsing the html and by stripping tags and putting them into a preformatted-html template.  
  
`ß.vueinclude_html_parser_options` - use options from [node-html-parser](https://www.npmjs.com/package/node-html-parser)  
`ß.vueinclude_striptags_allowed_tags` and `ß.vueinclude_striptags_tag_replacement` - use options from [striptags](https://www.npmjs.com/package/striptags)


[`html.js:10`](https://anima.d250.hu:9001/p/@vue-modules/vueinclude/lib/html.js?line=10)


clouddir txt files are prepared for vue


[`txt.js:3`](https://anima.d250.hu:9001/p/@vue-modules/vueinclude/lib/txt.js?line=3)

<pre>
init
 - vueinclude.js
lib
 - build.js
 - html.js
 - txt.js
 - vue.js
routes
 - build.js
start
 - vue-include.js
vue
 - vue-include
 - vue-include.vue
</pre>



## The @vuetify module
#### /@vue-modules/vuetify
Vuetify is a UI liberary.


[`vuetify.js:5`](https://anima.d250.hu:9001/p/@vue-modules/vuetify/routes/vuetify.js?line=5)

<pre>
routes
 - vuetify.js
vue
 - assets
 - components
 - plugins
</pre>



## The @vuex module
#### /@vue-modules/vuex
we create a `ß.vuex_modules` object, which is a subset of `ß.modules`.


[`vuex-modules.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vuex/global/vuex-modules.js?line=1)

The vuex source tree is built up at the init stage


[`vuex-init.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vuex/init/vuex-init.js?line=1)

The vue source tree contains symlinks to the real files of the project - based on the modules used.


[`uplink_source_tree.js:1`](https://anima.d250.hu:9001/p/@vue-modules/vuex/lib/uplink_source_tree.js?line=1)

Based on `ß.vuex_modules` we create a subset of node modules for vue


[`uplink_source_tree.js:46`](https://anima.d250.hu:9001/p/@vue-modules/vuex/lib/uplink_source_tree.js?line=46)

The `src` folder is actually a unified version of all vue folders


[`uplink_source_tree.js:49`](https://anima.d250.hu:9001/p/@vue-modules/vuex/lib/uplink_source_tree.js?line=49)

<pre>
global
 - vuex-modules.js
init
 - vuex-init.js
lib
 - create_store_file.js
 - uplink_source_tree.js
vuex
 - server.js
 - socket.js
</pre>



