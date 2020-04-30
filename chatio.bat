@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION

IF %0 == "%~0" (
  :PROMPT
  ECHO Welcome to ChatIO!
  ECHO. & ECHO.

  ECHO What program are we using?
  SET /p prog=""

  ECHO.
  ECHO What file are we running?
  SET /p file=""

  ECHO. & ECHO.
  ECHO Please wait one millisecond while we run your command!
  start node ./backend/server !prog! !file! & start npm run start --prefix ./frontend
  GOTO END
) else (
  IF "%1" == "" (
    GOTO PROMPT
  )
  start node ./backend/server %1 %2 & start npm run start --prefix ./frontend
)

:END
