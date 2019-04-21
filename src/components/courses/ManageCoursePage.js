import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
// import { bindActionCreators } from "redux";

// any component loaded via <Route> gets history passed in on props from React Router
function ManageCoursesPage({ courses, authors, loadCourses, saveCourse, history, loadAuthors, ...props }) {
  const [course, setCourse] = useState({...props.course});
  const [errors, setErrors] = useState({});

  // It is similar componentDidMount b/c it will only run once b/c [] we passed empty [] so there is nothing to watch
  useEffect(()=>{
    if (courses.length === 0) {
      loadCourses().catch(err => {
        alert(`Failed to load api call: ${err}`);
      });
    } else {
        console.log({...props.course});
        setCourse({...props.course});
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        alert(`Failed to load loadAuthors: ${err}`);
      });
    }
  },[props.course]);

  function handleChange(event) {
      const {name, value} = event.target;
      setCourse(preCourse => ({
          ...preCourse,
          [name]: name === "authorId"? parseInt(value, 10): value
      }));
  }

  async function handleSave(event) {
      event.preventDefault();
      await saveCourse(course);
      history.push("/courses");
  }

  return <CourseForm course={course} errors={errors} onSave={handleSave} onChange={handleChange} authors={authors}/>
}

// Proptypes
ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

// Redux mapping
// mapStateToProps runs every time the Redux store changes. So, when courses are available, we'll call getCourseBySlug
const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0? getCourseBySlug(state.courses, slug): newCourse
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

// if we declare mapDispatchToProps as an object instead, each property will automatically bounded to dispatch
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

// Redux connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursesPage);
