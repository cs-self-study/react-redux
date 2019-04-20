import * as types from "./actionTypes";
import * as courseAPi from "../../api/courseApi";

export const createCourse = course => {
  return { type: types.CREATE_COURSE, course };
};

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  return function(dispatch) {
    return courseAPi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(err => {
        throw err;
      });
  };
}
