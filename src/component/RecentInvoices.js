import React from "react";


import { BaseUrl } from '../Constants/BusinessManager';
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import {
  SendHttpRequest,
} from "../component/utility";

const mapStateToProps = state => {
  return {
    Token: state.Token,
  };
};
class RecentInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: null,
      ImageModal: false,
      imageUrl: ''
    };
  }
  async componentDidMount() {
    try {
      var data = await SendHttpRequest(
        BaseUrl + "GetRecentInvoice",
        { Token: this.props.Token },
        "POST"
      );
      if (data.Success) {
        if (data.Data === "") {
          this.setState({ dataSource: null, loading: false });
        }
        else {
          this.setState({ dataSource: data.Data, loading: false });
        }
        return;
      } else {
        throw new Error("Something went wrong try again later");
      }
    } catch (error) {
      return alert("Oops!", error.message, [
        {
          text: "ok",
          onClick: () => {
            this.setState({ loading: false });
          }
        }
      ], { cancelable: false });
    }
  }
  renderitem = ({ item, index }) => {
    //console.log(item);
    const date = new Date(item.DateTime);
    return (
      <div style={styles.card}>
        <div style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}><p style={styles.font}>{item.VendarEmail}</p></div>
        <div style={{ flex: 0.6 }}>
          <div style={{ flex: 0.5, borderBottomWidth: 1, borderBottomColor: 'white', marginHorizontal: 5 }}>
            <div style={{ flexDirection: "row" }}>
              <div style={{ flex: 0.4, justifyContent: 'center' }}><div style={{ flexDirection: 'column', alignItems: "center" }}><p style={styles.font}>Amount</p><p style={styles.font2}>{parseFloat(item.Amount).toFixed(2).toString() + " " + item.Currency}</p></div></div>
              <div style={{ flex: 0.6, alignItems: "center", justifyContent: 'center' }}><div style={{ flexDirection: 'column', alignItems: "center" }}><p style={styles.font}>Invoice Number</p><p style={styles.font2}>{item.InvoiceId}</p></div></div>
            </div>
          </div>
          <div style={{ flex: 0.5, marginHorizontal: 5 }}>
            <div style={{ flexDirection: "row" }}>
              <div style={{ flex: 0.4, justifyContent: 'center' }}><div style={{ flexDirection: 'column', alignItems: "center" }}><p style={styles.font}>Date</p><p style={styles.font2}>{date.toDateString()}</p></div></div>
              <div style={{ flex: 0.6, alignItems: "center", justifyContent: 'center' }}><div style={{ flexDirection: 'column', alignItems: "center" }}><p style={styles.font}>Description</p><p style={styles.font2}>{item.InvoiceDescription}</p></div></div>
            </div>
          </div>
        </div>
        <div style={{ flex: 0.05 }}></div>
        <div style={{ backgroundColor: 'white', flex: 0.15, borderWidth: 1, borderColor: 'black', padding: 5 }}>
          <p style={{ fontSize: 18, color: 'white' }}>
            Tap for invoice image
             </p>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div style={styles.container}>
        <Modal isVisible={this.state.ImageModal}>
          <div style={{ flex: 1 }}>
            <button onClick={() => { this.setState({ ImageModal: false }) }}
              title="Close" />
            <img
              style={{
                width: "100%",
                resizeMode: 'center',
                height: "100%",
              }}
              alt=""
              src={{ uri: this.state.imageUrl }}
            />
          </div>
        </Modal>
        {this.state.dataSource == null ? <div style={{ flex: 0.1 }}><h6 style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>No Recent Invoices</h6></div> :
          <div>

            data={this.state.dataSource}
            {this.renderitem()}
          </div>

        }
      </div>
    )
  }
}
const styles = ({
  container: {
    alignItems: "center",
    flex: 1,
    paddingTop: 15,
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "transparent"
  },
  card: {
    marginBottom: 20,
    //width: width * 0.9,
    height: 250,
    padding: 5,
    backgroundColor: "#323C4D",
    flexDirection: 'column',
    color: 'white',
  },
  font: {
    fontSize: 18,
    color: 'white',
    padding: 5
  },
  font2: {
    fontSize: 15,
    color: 'white',
    padding: 5,

  }
});
export default connect(mapStateToProps, null)(RecentInvoices);