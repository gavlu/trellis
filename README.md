#Trellis
This is the repo for our friendship maintaining webapp, Trellis.

##Getting Started
1. Git clone this repo
2. `npm install` and `bower install`
3. Run `grunt serve`

##Team Workflow
####On `master` branch
1. `git pull`
2. Make a new branch and switch to that branch by running `git checkout -b my_feature`

####On `my_feature` branch
3. Do your changes here
4. `git add -A` and `git commit -m "my changes"`
5. `git checkout master`

####On `master` branch
6. `git pull`
7. `git checkout my_feature`

####On `my_feature` branch
8. `git merge master`
9. RESOLVE ALL CONFLICTS <<< IMPORTANT!
10. `git add -A` and `git commit -m "merged master into my_feature"
11. `git push origin my_feature`

####On Github
12. Create a pull request
13. Notify someone that you have created a pull request
14. Don't branch or work on another feature until the request has been merged into master.

####On your local computer
15. `git checkout master`

####On `master`
16. `git pull`
17. Repeat the steps

####Please keep this workflow here for reference.