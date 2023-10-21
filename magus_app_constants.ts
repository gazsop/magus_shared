/*********************************************
************** APPLICATION TYPES**************
*********************************************/

/*********************************************
**************** ADVANTURE TYPES**************
*********************************************/

/*********************************************
*************** CHARACTER TYPES***************
*********************************************/

export const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

export const LIST_OF_POST_REQ_TYPES = {
  LOGINUNAME: "loginUName",
  LOGINPWD: "loginPwd",
  ERROR: "error",
  LOGOUT: "logout"
};