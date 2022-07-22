## GIT BRANCH COMMANDS
> in Terminal (main)
  - create new branch
      git checkout -b <new branch name>
        ** -b is for "branch"
  - switch to/from branch
      git checkout <branch name>
  - push new branch
      git push -u origin <branch name>
        ** -u is for "upstream"
  - delete remote branch
      git push <branch name> -d <branch name>
  - delete local branch
      git branch -d <branch name>
  - update remote branch 
      git push -u origin <branch name>
        ** same commande as initiating branch (above)
  - pull request into main branch
    > in github
      > on branch page
      - click button: "Compare and Pull Request"
      - check for conflicts
        ![alt text](https://nateflake.com/wp-content/uploads/2022/07/github_compare_before_pull.png)
      - Click button: "Create Pull Request"
      - Click button: "Merge Pull Request"
      - Click button: "Congirm Merge"
      - Click button: "Delete Branch"
