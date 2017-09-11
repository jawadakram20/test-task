import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropzone from 'react-dropzone'
import {Table} from 'react-bootstrap'
import Users from './users.jsx'
import {Modal, Button, Panel} from 'react-bootstrap/lib'
import { connect } from 'react-redux'
import axios from 'axios'

class PlanetsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { showModal: true}
    this.hideModal = this.hideModal.bind(this)
  }

  hideModal(){
    let self = this
    self.setState({showModal: false})
    self.props.hideModal()
  }


  render() {
    let self = this
    const {planet} = self.props
    return (
      <Modal
        show={self.state.showModal}
        onHide={self.hideModal}
        dialogClassName="data-modal"
      >
        <Modal.Header className="bb-0" closeButton>
          <Modal.Title id="contained-modal-title-lg">{ !planet.isLoading ? planet.data.name : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="discovery-performance">
          <Table bordered condensed>
            <thead>
              <tr>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Population</th>
              </tr>
            </thead>
            {!planet.isLoading &&
              <tbody>
                <tr>
                  <td>{planet.data.diameter}</td>
                  <td>{planet.data.climate}</td>
                  <td>{planet.data.population}</td>
                </tr>
              </tbody>
            }
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <hr></hr>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = function(state){
  return {
    planet: state.planet
  }
}

export default connect(mapStateToProps)(PlanetsComponent)
