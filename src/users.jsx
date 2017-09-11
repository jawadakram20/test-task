import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import {Table} from 'react-bootstrap'
import _ from 'underscore'
import Planet from './planet.jsx'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap/lib'
import {
  getUsers,
  getPlanets
} from './actions'

const mapStateToProps = function(state){
  return {
    userData: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (url) => {
      dispatch(getUsers(url))
    },
    getPlanets: (url) => {
      dispatch(getPlanets(url))
    }
  }
}

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlanets: false
    }
    this.fetchUsers = this.fetchUsers.bind(this)
    this.listUsers = this.listUsers.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  fetchUsers(url){
    let self = this
    self.props.loadUser(url)
  }

  planetDetail(url){
    let self = this
    self.props.getPlanets(url)
    self.setState({showPlanets: true})
  }

  hideModal(){
    let self = this
    self.setState({showPlanets: false})
  }

  listUsers(){
    let self = this
    const {userData} = self.props
    return (
      <tbody>
        { _.map(userData.users.data.results, (user, index) => {
            return (
              <tr key={index.toString()}>
                <td>{user.name}</td>
                <td>{user.height}</td>
                <td>{user.mass}</td>
                <td>{user.created}</td>
                <td>{user.edited}</td>
                <td>
                  <Button className="btn btn-info" onClick={self.planetDetail.bind(self, user.homeworld)}>Planet</Button>
                </td>
              </tr>
            )
          })
        }
      </tbody>

    )
  }

  render() {
    let self = this
    const {userData} = self.props
    return (
       <div className="main">
          <div className="wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-ms-12">
                        <Table bordered condensed>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Height</th>
                              <th>Mass</th>
                              <th>Created</th>
                              <th>Edited</th>
                              <th>Planet</th>
                            </tr>
                          </thead>
                          {userData.isLoading ?
                            <tbody className="loader"></tbody> :
                            self.listUsers()
                          }

                        </Table>
                        <div className="clearfix"></div>
                        {!userData.isLoading &&
                          <ul className="pagination col-md-12">
                            {(userData.users.data.previous != null) &&
                              <li className="pull-left"><a href="javascript:void(0)" onClick={self.fetchUsers.bind(self, userData.users.data.previous)}>{"<< Pervious Page"}</a></li>
                            }
                            <li className="pull-right"><a href="javascript:void(0)" onClick={self.fetchUsers.bind(self, userData.users.data.next)} >{"Next Page >>"}</a></li>
                          </ul>
                        }
                        {self.state.showPlanets &&
                          <Planet hideModal={self.hideModal} showModal={true} />
                        }
                    </div>
                </div>
            </div>
          </div>
       </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
