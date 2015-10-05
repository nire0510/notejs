# note.js
**Command line tool for notes sharing**  

**note.js** is a node.js based tool which helps you share notes between your computers and even colleagues from terminal! 
You short text snippets will be saved online so you can access them anywhere you want.

## Installation
`npm install -g notejs`

## How to use
1. First you'll have to register:  
`note register USERNAME PASSWORD`

2. Now you can add your first note:  
`note add NOTE CONTENT`

3. To see all your notes (or someone else's):  
`note get USERNAME`

4. Alternatively, you can open specific note if you know its name:  
`note get USERNAME NOTE`

5. If you want to create a note which won't be seen when other users run the command in step #3, you can create 
 a somewhat "private" note, which will be see only for users who know the note's name:  
`note add-private NOTE CONTENT`

6. To delete an existing note:  
`note get USERNAME`

7. In any case your session expires, you have to login in order to manage your notes:  
`note login USERNAME PASSWORD`

8. Working on a public computer? make sure you logout after finish working:  
`note logout`

## Limitations
* Currently there are no limits on the number of notes one can create, but it may change in the future
* Username should contain 4-20 alphanumeric characters
* Password should contain 4-20 alphanumeric characters
* Note name should contain 2-20 alphanumeric characters
* Note content should contain 2-200 alphanumeric characters