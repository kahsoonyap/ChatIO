@ECHO OFF
echo Welcome to ChatIO!
set /p prog="What program are we using? "
set /p file="What file are we running? "
set /p args="What arguments are we having today? "
echo Please wait one millisecond while we run your command!
start node server %prog% %file% %args% & start npm run start --prefix ../frontend
