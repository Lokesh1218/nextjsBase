const initialState = {
  showmake : false,
  showbodyType : false,
  showprices : false,
  showfuel : false,
  showmileage : false,
  showyears : false,
  sellCarOpen: false,
  exitLeadOpen : false,
  isSupportClicked: false,
  showPremiumOverlay: false,
  showImgList: false,
  showOverViewModal: false,
  showFeaturesModal: false,
  showSampleReportModal: false,
  isCRFFormOpen: false,
  showThankYou: false,
  paperTransferOpen: false,
  insuranceOpen: false,
  warrantyOpen: false,
  thankyouOpen: false,
  carLoanOpen: false,
  checkpointsOpen: false,
  carExpertOpen: false,
  freemiumPackages : false,
  showFeedbackForm : false,
  showDirectPromotion: false,
  showSellerPremiumModal: false,
  isMoreClicked: false,
  showInvLocChangeModal: false
}
export { initialState as modalInitialState };
export default function modal(state = initialState, action) {
  switch(action.type) {
    case 'MODAL_OPEN_STATE': {
      delete action['type'];
      state = Object.assign({}, state, action.modalType);
      return state;
    }
    default: return state;
  }
}
