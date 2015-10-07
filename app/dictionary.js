/* global module */

module.exports = {
  "ERROR_OCCURRED": "An error has occurred: %s",
  "UNKNOWN_COMMAND": "No such command: %s",
  "INVALID_COMMAND_PARAMETERS": "Invalid parameters for command: %s",
  "MISSING_PARAMETERS": "Missing parameters",
  "LOGIN_FAIL": "User %s failed to login",
  "USERNAME_EXISTS": "User %s already exists",

  "LOGIN_DESCRIPTION": "Login to add and delete notes",
  "LOGOUT_DESCRIPTION": "Logout current user",
  "REGISTER_DESCRIPTION": "Register a new account",
  "GET_DESCRIPTION": "Read notes",
  "ADD_DESCRIPTION": "Add a new note or update existing one",
  "ADD_PRIVATE_DESCRIPTION": "Add a private note (visible only to users who have note's name)",
  "DELETE_DESCRIPTION": "Delete existing note",

  "LOGIN_SUCCESS": "User %s logged in successfully!",
  "LOGOUT_SUCCESS": "User logged out successfully!",
  "USER_ALREADY_LOGGED_IN": "User %s is already logged in",
  "REGISTER_SUCCESS": "User %s registered and logged in successfully!",
  "NOTE_PUBLIC_ADDED": "Note %s added successfully!",
  "NOTE_PRIVATE_ADDED": "Note %s added successfully!\nThis note won't be shown in your notes list",
  "NOTE_DELETED": "Note %s deleted successfully",

  "USERNAME_VALIDATION": "USERNAME is required and should contain 4-20 alphanumeric characters",
  "PASSWORD_VALIDATION": "PASSWORD is required and should contain 4-20 alphanumeric/special characters",
  "NOTE_VALIDATION": "NOTE is optional but if appears - should contain 2-20 alphanumeric characters",
  "NOTE2_VALIDATION": "NOTE is required and should contain at 2-20 alphanumeric characters",
  "CONTENT_VALIDATION": "CONTENT is required and should contain 2-200 alphanumeric & special characters"
};