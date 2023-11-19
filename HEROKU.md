# Heroku deployment record

```
JI-MBP:purpleturtle-Appartment-Management zhangji$ heroku create -a atms
Creating ⬢ atms... done
https://atms-8bf7a9e2d4f1.herokuapp.com/ | https://git.heroku.com/atms.git

JI-MBP:purpleturtle-Appartment-Management zhangji$ git remote -v
heroku  https://git.heroku.com/atms.git (fetch)
heroku  https://git.heroku.com/atms.git (push)
origin  git@github.com:bestedt/purpleturtle-Appartment-Management.git (fetch)
origin  git@github.com:bestedt/purpleturtle-Appartment-Management.git (push)

JI-MBP:purpleturtle-Appartment-Management zhangji$ heroku access:add Ty_bested@hotmail.com
Adding Ty_bested@hotmail.com access to the app atms... done
JI-MBP:purpleturtle-Appartment-Management zhangji$ heroku access:add anthony.dswg@gmail.com
Adding anthony.dswg@gmail.com access to the app atms... done

JI-MBP:purpleturtle-Appartment-Management zhangji$ heroku access
anthony.dswg@gmail.com  collaborator
ty_bested@hotmail.com   collaborator
zhangji80@outlook.com   owner

JI-MBP:purpleturtle-Appartment-Management zhangji$ git push heroku main
Counting objects: 3688, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2742/2742), done.
Writing objects: 100% (3688/3688), 5.00 MiB | 986.00 KiB/s, done.
Total 3688 (delta 827), reused 3559 (delta 786)
remote: Resolving deltas: 100% (827/827), done.
remote: Updated 29 paths from 07a3aac
remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Building on the Heroku-22 stack
remote: -----> Determining which buildpack to use for this app
remote: -----> Node.js app detected
remote:        
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:        
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Resolving node version 20.x...
remote:        Downloading and installing node 20.9.0...
remote:        Using default npm version: 10.1.0
remote:        
remote: -----> Installing dependencies
remote:        Installing node modules (package.json)
remote:        
remote:        added 168 packages, and audited 169 packages in 5s
remote:        
remote:        17 packages are looking for funding
remote:          run `npm fund` for details
remote:        
remote:        2 vulnerabilities (1 high, 1 critical)
remote:        
remote:        To address all issues (including breaking changes), run:
remote:          npm audit fix --force
remote:        
remote:        Run `npm audit` for details.
remote:        npm notice 
remote:        npm notice New minor version of npm available! 10.1.0 -> 10.2.4
remote:        npm notice Changelog: <https://github.com/npm/cli/releases/tag/v10.2.4>
remote:        npm notice Run `npm install -g npm@10.2.4` to update!
remote:        npm notice 
remote:        
remote: -----> Build
remote:        
remote: -----> Caching build
remote:        - node_modules
remote:        
remote: -----> Pruning devDependencies
remote:        
remote:        up to date, audited 169 packages in 632ms
remote:        
remote:        17 packages are looking for funding
remote:          run `npm fund` for details
remote:        
remote:        2 vulnerabilities (1 high, 1 critical)
remote:        
remote:        To address all issues (including breaking changes), run:
remote:          npm audit fix --force
remote:        
remote:        Run `npm audit` for details.
remote:        
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote: 
remote: -----> Compressing...
remote:        Done: 50.6M
remote: -----> Launching...
remote:        Released v3
remote:        https://atms-8bf7a9e2d4f1.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/atms.git
 * [new branch]      main -> main
JI-MBP:purpleturtle-Appartment-Management zhangji$ 
```