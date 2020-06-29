import { updateUser } from "./user";
import { APP_VERSION } from "../config/settings";

export const CHANGE_TUTORIAL = "CHANGE_TUTORIAL";
export const COMPLETE_TUTORIAL = "COMPLETE_TUTORIAL";

export function changeTutorial(tutorial) {
  return (dispatch) => {
    return dispatch({
      type: CHANGE_TUTORIAL,
      tutorial,
    });
  };
}

export function completeTutorial() {
  return (dispatch, getState) => {
    const user = getState().user.data;
    const { tutorial } = getState();
    if (!user.id) throw new Error("No user found");

    const tempTour = `${tutorial}`;
    let tempTutorials = {
      tutorials: {
        [tempTour]: APP_VERSION,
      },
    };

    if (user.tutorials) {
      tempTutorials = {
        tutorials: {
          ...user.tutorials,
          [tempTour]: APP_VERSION,
        },
      };
    }

    dispatch({ type: COMPLETE_TUTORIAL });
    return dispatch(updateUser(user.id, tempTutorials));
  };
}
