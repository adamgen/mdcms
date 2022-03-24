# MD CMS, a flat file markdown cms

## TODO

### Immediate tasks and basic story

- Prevent creating a file with existing name, allow only edits
- Allow renaming
- Add new file
  - Add a new temp file to the fs tree
  - Hide save button before there are title and content
- Delete a file
  - Right click or delete button
  - Delete dialog
- Edit filename
  - Add a rename-filename popup

Done

✅ Edit a file content

### Next

- Represent file navigation on browser
- Sync the md presentation component with an external one
- Live push file update to the browser
- Re work jest's environment
  - Add jest typeahead
- Add lint rules
  - Import order
  - cypress, no only
  - react, exhaustive hooks
  - no unused vars
  - prettier
- Add git support
  - Commit, pull and push from browser
  - Diff between branches
- Add documentation
- Add server interactivity
  - Notify about
    - Folder creation
    - File save/update/delete
  - Prettier notifications for existing consoles
