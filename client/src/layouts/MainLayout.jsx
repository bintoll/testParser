import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import '../constants/stylesheets/styles.scss'

class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <Grid fluid className="mainLayout">
        <Row center="xs" className="mainRow">
          {this.props.children}
        </Row>
      </Grid>
    )
  }
}

export default MainLayout