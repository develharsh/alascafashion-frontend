import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_SIDE_PANEL,
  HIDE_SIDE_PANEL,
} from "../constants/design";

export const design = (state = {}, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        enableNotif: true,
        data: action.payload,
      };
    case HIDE_NOTIFICATION:
      return {
        enableNotif: false,
        data: null,
      };
    case SHOW_SIDE_PANEL:
      return {
        enableSidePanel: true,
      };
    case HIDE_SIDE_PANEL:
      return {
        enableSidePanel: false,
      };
    default:
      return state;
  }
};
