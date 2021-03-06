import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CoursesList from "./CoursesList";
import { Redirect } from "react-router-dom";

class CoursesPage extends Component {
  state = {
      redictToAddCoursePage: false
  }

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(err => {
        alert(`Failed to load api call: ${err}`);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(err => {
        alert(`Failed to load loadAuthors: ${err}`);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
       {this.state.redictToAddCoursePage && <Redirect to="/course"/>}
        <h2>Courses</h2>
        <button
            style={{marginBottom: 20}}
            className="btn btn-primary add-course"
            onClick={() => this.setState({redictToAddCoursePage: true})}
        >
            Add Course
        </button>
        <CoursesList courses={this.props.courses} />
      </React.Fragment>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
