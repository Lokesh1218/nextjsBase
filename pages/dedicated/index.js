import React from 'react';
import { connect } from 'react-redux';
import {fetchDedicatedPageData} from '../../components/dedicated/actions';
import Dedicated from '../../components/dedicated';
import TruebilStorage from '../../utility/truebil-storage';

class Index extends React.Component {
  static async getInitialProps({store, isServer, query, req}, trackingInfo) {
    // Need to read listingId from store | currently listingId won't come in api call
    const currentListing  = TruebilStorage.getItem('listingId');
    if (isServer) {
      await store.dispatch(fetchDedicatedPageData(query.listingId, store));
    } else if (!store.getState().dedicated.dataLoaded || currentListing !== query.listingId) {
      store.dispatch(fetchDedicatedPageData(query.listingId, store));
    }
  }

  render() {
    return (
      <Dedicated {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  data: state.dedicated.data,
  loading: state.dedicated.loading,
  dataLoaded: state.dedicated.dataLoaded,
  error: state.dedicated.error,
  config: state.config,
  tempListingData: state.dedicated.tempListingData,
  showOverViewModal: state.modal.showOverViewModal,
  showSampleReportModal: state.modal.showSampleReportModal,
  showPremiumOverlay: state.modal.showPremiumOverlay,
  showFeaturesModal: state.modal.showFeaturesModal,
  gallery: state.gallery,
  showFeedbackForm: state.showFeedbackForm
});

export default connect(mapStateToProps)(Index);