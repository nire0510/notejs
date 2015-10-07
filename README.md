# note.js
**Command line tool for note-taking & sharing**  

**note.js** is a node.js based tool which helps you to take and share notes between your computers and even colleagues right from your terminal! 
You short text snippets will be saved online so you can access them anywhere you want.

## Installation
`npm install -g notejs`

## How to use
### Placeholders
* `USERNAME`: 4-20 alphanumeric characters (no spaces) - Your personal or your colleague's **note.js** username.
* `PASSWORD`: 4-20 alphanumeric & special characters (no spaces) - Your **note.js** password.
* `NOTE`: 2-20 alphanumeric characters (no spaces) - Note's name, also serves as its unique ID.
* `CONTENT`: 2-200 characters - Note's content.

### Commands
1. First you'll have to register in order to be able to use all features:  
`note register USERNAME PASSWORD`

2. Now you can add your first note:  
`note add NOTE CONTENT`

3. To see all your notes (or someone else's):  
`note get USERNAME`

4. Alternatively, you can open specific note if you know its name:  
`note get USERNAME NOTE`

5. If you want to create a note which won't be seen when other users run the command in step #3, you can create 
 a somewhat "private" note, which will be seen only for users who know the note's name:  
`note add-private NOTE CONTENT`

6. To delete an existing note:  
`note delete NOTE`

7. In any case your session expires, you have to login in order to be able to use all features:  
`note login USERNAME PASSWORD`

8. Working on a public computer? make sure you logout after finish working:  
`note logout`

## Limitations
* Currently, each user is allowed to create up to 100 notes (it may change in the near future)