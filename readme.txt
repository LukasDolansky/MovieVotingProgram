Programs needed to run this:
1. Node.js
2. Heroku CLI (You will need to make an account for this)

Summary: 
Github is used as the collaborative remote repo to share changes across developers.
Heroku is used as a hosting service to make API publicly accessible.
You will need to use a terminal to access Heroku's functions and to manipulate the multiple git repos.
Adding and committing files is the same, but you will need to specify which remote repo to push to:
[ git push heroku ] (or) [ git push main ]

Note:
Cloning this repo only retains the remote repo from the source of the clone.
(if you clone from github, you can push to github but will manually have to add heroku as a remote repo)

To check what remote repos are currently added: [ git remote -v ]

To add the github repo: [ git remote add https://github.com/LukasDolansky/MovieVotingProgram.git ]

To add the heroku repo: [ git remote add https://git.heroku.com/movie-voting-program.git ]

To run this locally (without using Heroku):
[ node index.js ]
Take note of the port.
Go to your favorite browser and go to localhost:3000
    (or whatever the port is intead of 3000)

To run this publicly using Heroku:
Make sure all changes are committed and pushed to Heroku.
Make sure there are remote hosts available from Heroku with [ heroku ps]
Change the amount of open channels(?) with [heroku ps:scale web=num ] where num is how many you need.
[ heroku open ]