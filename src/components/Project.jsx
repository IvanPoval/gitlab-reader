import React, {Component} from "react";
import Moment from "moment";

export class Project extends Component {
  render() {
    const {project} = this.props;

    return (
      <>
        <td className="text-center">
          {project.id}
        </td>
        <td>
          {project.avatar_url &&
            <img src={project.avatar_url} alt="project-avatar" width="70"/>
          }
        </td>
        <td>
          {Moment(project.created_at).format('DD.MM.YYYY HH:mm')}
          <br/>
          {Moment(project.last_activity_at).format('DD.MM.YYYY HH:mm')}
        </td>
        <td>
          {project.name_with_namespace}
          <br/>
          <em>{project.path_with_namespace}</em>
        </td>
        <td className="text-center">
          {project.star_count}
        </td>
        <td>
          <a href={project.http_url_to_repo} target="_blank" rel="noreferrer" >{project.http_url_to_repo}</a>
          <br/>
          <a href={project.web_url} target="_blank" rel="noreferrer" >{project.web_url}</a>
        </td>
      </>
    )
  };
}
