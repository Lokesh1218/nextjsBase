import React from 'react';
import Confirmation from '../../components/confirmation';

class Index extends React.Component {
  static async getInitialProps({isServer, store, query, res}) {
    return {'query': query};
  }

  render() {
    return (
      <Confirmation query={this.props.router.query} />
    );
  }
}

export default Index;