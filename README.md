# ChatIO
ChatIO is a student-friendly interface for interacting with the command line.

## Running file by doubling-clicking
1.  Go into the Backend Folder
2.  Double click the chatio.bat file in the root folder
3.  A cmd window will open up, please follow the prompts given by the cmd prompt
4.  Two windows will open up, a nodejs window and a cmd window
    Your default browser will also open with the web app
    Use the full url given the cmd window the to access remotely ex:"http://127.0.0.1:3000"
5.  Close both the cmd window and the nodejs

## Running file via cmd
1. Navigate to the root folder of ChatIO
2. Know the path to the file you want to run
3. Type `chatio.bat` then press enter and follow the prompts given
4. Optionally you can skip the prompts by providing the information at the time of launch
ex. `chatio.bat python helloworld.py`

## Where to place the file
Place the file in the root of ChatIO (the same directory as me!)
If you would like to use a file from a different directory, just type in the relative path from here.
ex.
File structure

ChatIO
  - README.md
  - chatio.batch

SomeOtherFolder
  - AReallyCoolProgramYouWrote.py

In this case type `../SomeOtherFolder/AReallyCoolProgramYouWrote.py` instead of `AReallyCoolProgramYouWrote.py` when prompted for a file to run
