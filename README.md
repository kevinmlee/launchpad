# Social Media Search

## How to install and run

- Open terminal and go into your workspace
- run this command: 'git clone https://github.com/kevinmlee/social-search.git'
  - it should start downloading everything you need.
- run 'npm install' to install required libraries
- run 'npm start' to start server and client. You should now be able to view the app at 'http://localhost:3000'

## Pushing to staging

- Set up your branch with 'git checkout -b your-name/issue-#'
- Once you are statisfied with your changes, run 'git add --all' in terminal
- Run "git commit -m 'your explanation of your changes'" (without the double quotes).
  - Please make sure this is short, but descriptive.
  - For example: "Fixed bug" is not enough. "Fixed bug causing page component to crash. Updated blah function." is descriptive.
- Run 'git push'
- Go to github and submit a pull request

This will push everything into GitHub which will automatically deploy onto what we have set up on Heroku for staging. You may access or view your changes here: https://socialmediasearch.herokuapp.com/. Build process will take some time, so check back later.

## Getting your changes onto production

- Your changes will need to be reviewed before it will be pushed into the production environment so this process may take some time
