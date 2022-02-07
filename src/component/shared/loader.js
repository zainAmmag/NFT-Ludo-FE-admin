import React from "react"
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {

    isLoaderActive: state.isLoaderActive,
  };
};

class loader extends React.Component {

  render() {

    return (
      <LoadingOverlay
        active={this.props.isLoaderActive}
        spinner
        text='Please wait...'
        styles={{
          wrapper: {
            position:'fixed',
            top: 0,
            left: 0,
          width: "100%",
          height: "100%",
          overflow: this.props.isLoaderActive ? 'hidden' : 'unset'
        }
        }}
            >
  { this.props.children }
          </LoadingOverlay >
            )
    }
}
export default connect(mapStateToProps, null)(loader);
