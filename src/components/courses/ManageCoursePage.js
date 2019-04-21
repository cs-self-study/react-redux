import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";

function ManageCoursesPage({ courses, authors, loadCourses, loadAuthors }) {
  // It is similar componentDidMount b/c it will only run once b/c [] we passed empty [] so there is nothing to watch
  useEffect(()=>{
    if (courses.length === 0) {
      loadCourses().catch(err => {
        alert(`Failed to load api call: ${err}`);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        alert(`Failed to load loadAuthors: ${err}`);
      });
    }
  },[]);

  return (
    <React.Fragment>
       <h2>Manage Course</h2>
    </React.Fragment>
  );
}

// Proptypes
ManageCoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
};

// Redux mapping
const mapStateToProps = state => {
  return {
    courses: state.courses,
    authors: state.authors
  };
};

// if we declare mapDispatchToProps as an object instead, each property will automatically bounded to dispatch
const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

// Redux connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursesPage);
