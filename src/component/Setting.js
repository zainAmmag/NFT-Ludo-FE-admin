import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import coinImage from '../Assets/images/coin.gif'
import Logout from "./Logout";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
import SelectDefaultCurrency from "./SelectDefaultCurrency";
import CurrentClientId from './CurrentClientId';
function mapStateToProps(state) {
    return {
        Wallets: state.Wallets,
        Defaults: state.Defaults,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch)
    };
}

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            copyButton: "Copy",
            buttonColor: false
        }

    }
    copyCodeToClipboard = () => {
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = this.textArea.state.ClientId;;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
        this.setState({ 
            copyButton: "Copied",
            buttonColor: true
        });
      };
    render() {
        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        const divCard = {
            padding: "5%"
        }
        const merchantHeading = {
            color: "#fabf01"
        }

        const modalCloseButton = {
            backgroundColor: "#fabf01",
            border: "none",
            padding: "6px 60px"
        }
        return (
            <div>
                <div className="container body-content" >
                    <div className="card" style={divCard}>
                        <div className="row">
                        <div className="col-md-3"></div>
                            <div className="col-md-2">
                                <img src={coinImage} alt="" width="100" />
                            </div>
                            <div className="col-md-4 setting-heading">
                                <p style={merchantHeading}>pay WALA Merchant</p>
                                <p>My money my control</p>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                        <div className="props-divs">
                            <p>Default Currency</p>
                        </div>
                        <div className="currency-select" variant="primary" onClick={handleShow}>

                            <p ><i className="fa fa-database menuIcon"></i>{this.getCurrencyById((this.props.Defaults.DefaultCurrencyId) ? this.props.Defaults.DefaultCurrencyId : null)}</p>
                        </div>
                        <div className="props-divs">
                            <p>Your Client Id</p>
                        </div>
                        <div className="currency-select">

                            <p style={{paddingRight:0}}><i className="fa fa-id-badge menuIcon"></i><CurrentClientId  ref={(textarea) => (this.textArea = textarea)}/>
                            <button   className={!this.state.buttonColor?"ClientIdCopyButton" : "ClientIdCopiedButton"}
                                    onClick={() => this.copyCodeToClipboard()}    
                                    >{this.state.copyButton}</button>
                            </p>
                        
                        </div>
                        <div className="props-divs">
                            <p>Security</p>
                        </div>
                        <Logout>
                            <div className="currency-select">

                                <p><i className="fa fa-sign-out menuIcon"></i>Logout</p>
                            </div>
                        </Logout>
                    </div>
                </div>



                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Body>
                        {(this.props.Wallets.Currencies) ? this.props.Wallets.Currencies.map((element, index) => {
                            let selected = (element.CurrencyId + "" === "" + this.props.Defaults.DefaultCurrencyId);

                            return <SelectDefaultCurrency disabled={selected} started={() => {
                                this.setState({ show: false });
                            }} Id={element.CurrencyId} key={index}><p style={{color:"#fff"}}>{(selected) ? <i style={{ color: "green" }} className="fa fa-check"></i> : <i></i>}{element.FullName}
                                </p><hr style={{ margin: 0, marginBottom: 16 , borderTop: "1px solid #6c757d"  }} /></SelectDefaultCurrency>
                        }) : <div></div>}
                    </Modal.Body>
                    <Modal.Footer style={{ background: "transparent" }}>
                        <Button variant="secondary" onClick={handleClose} style={modalCloseButton}>
                            Close
          </Button>
                    </Modal.Footer>

                </Modal>

            </div>
        );
    }
    getCurrencyById(id) {
        if (this.props.Wallets.Currencies && id) {
            for (const element of this.props.Wallets.Currencies) {
                if (element.CurrencyId + "" === id + "") {
                    return element.FullName;
                }
            }
        } else {
            return "Ethereum"
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);