import React, {Component} from "react";
import "./assets/scss/bootstrap.scss";
import "./App.scss";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

import {get} from "./services/request-service";
import {credentialAuthHandler, OAuthHandler} from "./services/auth-provider";

import ProjectsList from "./components/ProjectsList";
import {Header} from "./components/Header";

class App extends Component {
  state = {
    isAuth: false,
    error: null,
    username: '',
    password: '',
    showUserProjects: false,
    user: null,
    projects: [],
    userProjects: [],
  };

  onAuth = (event) => {
    OAuthHandler().then(res => {
      if (res) {
        this.setState((state) => {
          return {
            ...state,
            isAuth: true,
            password: '',
            error: null,
          }
        });
        this.getUser(this.state.username);
        this.getProjects();
      }
    }).catch(error => {
      this.setState((state) => {
        return { ...state, error }
      });
    });
  };

  login = (event) => {
    event.preventDefault();
    credentialAuthHandler(this.state).then(res => {
      if (res) {
        this.setState((state) => {
          return {
            ...state,
            isAuth: true,
            password: '',
            error: null,
          }
        });
        this.getUser(this.state.username);
        this.getProjects();
      }
    }).catch(error => {
      this.setState((state) => {
        return { ...state, error }
      });
    });
  };

  logout = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    this.setState((state) => {
      return { ...state, isAuth: false, username: '', user: null, projects: [], userProjects: [] };
    });
  };

  getUser = (username) => {
    get(`users?username=${username}`).then((res) => {
      localStorage.setItem('username', username);
      this.setState((state) => {
        return { ...state, user: res[0] || null };
      });
    });
  };

  getUsersProjects = () => {
    get(`users/${this.state.username}/projects`).then((res) => {
      this.setState((state) => {
        return { ...state, userProjects: res || [], showUserProjects: true };
      });
    });
  };

  getProjects = () => {
    get('projects').then((res) => {
      this.setState((state) => {
        return { ...state, projects: res || [] };
      });
    });
  };

  componentDidMount() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if ((new Date()).getTime() >= token_expires) {
      this.logout();
    } else if (username && token && username !== '' && token !== '') {
      this.setState((state) => {
        return {
          ...state,
          isAuth: true,
          username,
          password: '',
        }
      });
      this.getUser(username);
      this.getProjects();
    }
  }

  render() {
    const { isAuth, error, username, password, projects, userProjects, showUserProjects } = this.state;

    return (
      <>
        <Header />
        <div className="App pt-2">
          <Container>
            {!isAuth &&
              <Row>
                <Col className="col-4"></Col>
                <Col className="col-4">
                  <Form onSubmit={this.login}>
                    <h3>Login</h3>

                    {/*<OverlayTrigger placement="bottom" overlay={<Tooltip>OAuth with GitLab</Tooltip>}>
                      <Button variant="outline-danger" className="btn-sm mt-1" onClick={this.onAuth}>
                        OAuth GitLab
                      </Button>
                    </OverlayTrigger>*/}

                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        required
                        value={username}
                        onChange={(event) => {
                          this.setState({
                            username: event.target.value
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={(event) => {
                          this.setState({
                            password: event.target.value
                          });
                        }}
                      />
                    </Form.Group>

                    {error && <p className="text-danger">Invalid credential data</p>}

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col className="col-4"></Col>
              </Row>
            }
            {isAuth &&
              <Row>
                <Col className={'col-12'}>
                  {this.state.user &&
                    <div className={'mb-2'}>
                      <h4>User details</h4>

                      <Row>
                        <Col className={'col-2'}><b>Avatar</b></Col>
                        <Col className={'col-10'}>
                          {this.state.user.avatar_url &&
                            <img src={this.state.user.avatar_url} alt="user-avatar" width="70"/>
                          }
                          {!this.state.user.avatar_url &&
                            <em>No avatar</em>
                          }
                        </Col>
                      </Row>
                      <Row>
                        <Col className={'col-2'}><b>User ID</b></Col>
                        <Col className={'col-10'}>{this.state.user.id}</Col>
                      </Row>
                      <Row>
                        <Col className={'col-2'}><b>Username</b></Col>
                        <Col className={'col-10'}>{this.state.user.username}</Col>
                      </Row>
                      <Row>
                        <Col className={'col-2'}><b>State</b></Col>
                        <Col className={'col-10'}>{this.state.user.state}</Col>
                      </Row>
                      <Row>
                        <Col className={'col-2'}><b>Web URL</b></Col>
                        <Col className={'col-10'}>{this.state.user.web_url}</Col>
                      </Row>
                      <Row>
                        <Col className={'col-2'}>
                          <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
                            <Button variant="outline-danger" className="btn-sm mt-1" onClick={this.logout}>
                              Logout
                            </Button>
                          </OverlayTrigger>
                        </Col>
                        <Col className={'col-10'}>
                          <OverlayTrigger placement="bottom" overlay={<Tooltip>Show user projects</Tooltip>}>
                            <Button variant="outline-primary" className="btn-sm mt-1" onClick={this.getUsersProjects}>
                              Show projects
                            </Button>
                          </OverlayTrigger>
                        </Col>
                      </Row>
                    </div>
                  }
                  {showUserProjects &&
                    <div className={'mb-2'}>
                      <h4>User projects</h4>
                      {userProjects.length !== 0 &&
                        <ProjectsList projects={userProjects}/>
                      }
                      {userProjects.length === 0 &&
                        <p>No user projects yet</p>
                      }
                    </div>
                  }

                  <h4>Last GitLab projects</h4>
                  {projects.length !== 0 &&
                    <ProjectsList projects={projects}/>
                  }
                  {projects.length === 0 &&
                    <p>No projects yet</p>
                  }
                </Col>
              </Row>
            }
          </Container>
        </div>
      </>
    );
  }
}

export default App;
