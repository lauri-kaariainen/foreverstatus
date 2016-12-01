# foreverstatus

#your problem
You have a bunch of nodejs software running on <a href="https://github.com/foreverjs/forever">forever</a> 
and it's working great.<br/>
BUT!<br/>
Then one day some of the plethora of APIs you use bug out, and maybe cause one (or more) of your software to fall. 
Forever will try to restart it a few times but eventually just stops. Now your service is down and you're none the wiser.
#a kind of solution
You run this software and get a sweet json status list from <a href="http://localhost:9009/statuses">http://localhost:9009/statuses</a>, and maybe visualization also off the server where you run the forever.
#what it does
<b>foreverstatus</b> reads statuses from command 'forever logs' and parses the logfiles 
using grep. Then it looks if it sees an error after which the software wasn't restarted.
