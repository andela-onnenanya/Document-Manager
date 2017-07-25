
const actionTypes = {
  // Create User
  WILL_CREATE_USER: 'WILL_CREATE_USER',
  CREATE_USER: 'CREATE_USER',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

  // Create User
  SIGNIN_USER: 'SIGNIN_USER',
  SIGNIN_USER_SUCCESS: 'SIGNIN_USER_SUCCESS',
  SIGNIN_USER_FAILURE: 'SIGNIN_USER_FAILURE',
  SET_USER_DETAILS: 'SET_USER_DETAILS',

  // Get User
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',

  // Search Users
  SEARCH_USERS_SUCCESS: 'SEARCH_USERS_SUCCESS',
  SEARCH_USERS_FAILURE: 'SEARCH_USERS_FAILURE',

  // Get Matching Users
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAILURE: 'GET__USERS_FAILURE',

  // Update User
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  // Delete User
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_DOCUMENT_FAILURE',

  // Validate User
  VALIDATE_USER_SUCCESS: 'VALIDATE_USER_SUCCESS',
  VALIDATE_USER_FAILURE: 'VALIDATE_USER_FAILURE',

  // Logout
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  // Create Document
  CREATE_DOCUMENT: 'CREATE_DOCUMENT',
  CREATE_DOCUMENT_SUCCESS: 'CREATE_DOCUMENT_SUCCESS',
  CREATE_DOCUMENT_FAILURE: 'CREATE_DOCUMENT_FAILURE',

  // Get a single document
  GET_DOCUMENT: 'GET_DOCUMENT',

  // Get All Documents
  GET_ALL_DOCUMENTS: 'GET_ALL_DOCUMENTS',

  // Handle all forms of getting document(s), aside user documents
  GET_DOCUMENTS_SUCCESS: 'GET_DOCUMENTS_SUCCESS',
  GET_DOCUMENTS_FAILURE: 'GET_DOCUMENTS_FAILURE',

  // Get All User Documents
  GET_USER_DOCUMENTS: 'GET_USER_DOCUMENTS',
  GET_USER_DOCUMENTS_SUCCESS: 'GET_USER_DOCUMENTS_SUCCESS',
  GET_USER_DOCUMENTS_FAILURE: 'GET_USER_DOCUMENTS_FAILURE',

  // Update Document
  UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
  UPDATE_DOCUMENT_SUCCESS: 'UPDATE_DOCUMENT_SUCCESS',
  UPDATE_DOCUMENT_FAILURE: 'UPDATE_DOCUMENT_FAILURE',

  // Search Documents
  SEARCH_DOCUMENTS: 'SEARCH_DOCUMENTS',

  // DeleteUpdate Document
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',
  DELETE_DOCUMENT_SUCCESS: 'DELETE_DOCUMENT_SUCCESS',
  DELETE_DOCUMENT_FAILURE: 'DELETE_DOCUMENT_FAILURE',
};

export default actionTypes;
