import React, {memo} from "react";
import {Project} from "./Project";
import {Table} from "react-bootstrap";
import {useThemeContext} from "../hooks/useThemeContext";

const ProjectsList = ({projects}) => {
  const { darkMode } = useThemeContext();
  const theme = darkMode ? 'dark' : 'light';

  return (
    <Table striped bordered hover variant={theme}>
      <thead>
      <tr>
        <th width={70}>ID</th>
        <th>Avatar</th>
        <th>Created At<br/>Last Activity At</th>
        <th>Namespace / Name<br/>Path with namespace</th>
        <th width={85} className="text-center">Stars</th>
        <th>Repo URL<br/>Web URL</th>
      </tr>
      </thead>
      <tbody>
      {projects.map(project => (
        <tr key={project.id}>
          <Project project={project}/>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default memo(ProjectsList);
