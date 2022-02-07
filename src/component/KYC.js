import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsLoaderActive } from '../actions/index';
import { BaseUrl, AuthenticationTokenId, ImageBaseUrl } from "../Constants/BusinessManager";
import { SendHttpRequest } from './utility';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone';
import swal from 'sweetalert';
import { CheckSquare } from 'react-feather';


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    };
}

class KYC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kycVerified: true,
            emptyFieldMsg: null,
            kyc: {
                FirstName: '',
                LastName: '',
                DOB: new Date(),
                Address: '',
                CountryOfResidence: '',
                PlaceOfBirth: '',
                Zipcode: '',
                Selfie: '',
                PhoneNumber: ''
            }
        }
    }
    async componentDidMount() {
        try {
            this.props.setIsLoaderActive(true);
            let token = localStorage.getItem(AuthenticationTokenId);
            let response = await SendHttpRequest(BaseUrl + "GetKYCProfile",
                {
                    Token: token
                }
                , "POST");
            if (response.Success === true) {

                if (response.Data.FirstName !== null && response.Data.FirstName !== "") {
                    this.setState({
                        kyc: {
                            FirstName: response.Data.FirstName,
                            LastName: response.Data.LastName,
                            Address: response.Data.Address,
                            DOB: new Date(response.Data.DateOfBirth),
                            CountryOfResidence: response.Data.CountryOfResidence,
                            PlaceOfBirth: response.Data.PlaceOfBirth,
                            Zipcode: response.Data.ZipCode,
                            Selfie: response.Data.IdFrontUrl,
                            PhoneNumber: response.Data.PhoneNumber
                        }
                    });
                    setTimeout(() => {
                        this.setState({ kycVerified: true });
                        this.props.setIsLoaderActive(false);
                    }, 100);
                } else {
                    this.setState({ kycVerified: false });
                    this.props.setIsLoaderActive(false);
                }
            } else {
                this.setState({ kycVerified: false });
                this.props.setIsLoaderActive(false);
            }

        } catch (error) {
            this.props.setIsLoaderActive(false);
            return swal({
                icon: 'error',
                text: 'Something went wrong, try to re-login'
            })
        }
    }
    async SaveInvoice(event) {
        event.preventDefault();
        let { FirstName, LastName, Address, DOB, CountryOfResidence, PlaceOfBirth, Zipcode, Selfie, PhoneNumber } = this.state.kyc;
        let isValid = true;
        if (FirstName === "" ) {
            // swal({ icon: 'error', text: "First name is empty." });
             isValid = false;
             return this.setState({ emptyFieldMsg: "Please fill all fields" });           
        }
        else if (LastName === "") {
            // swal({ icon: 'error', text: "Last name is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (Address === "") {
            // swal({ icon: 'error', text: "Address is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (DOB === "") {
            // swal({ icon: 'error', text: "Date of birth is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (CountryOfResidence === "") {
            // swal({ icon: 'error', text: "Country of residence is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (PlaceOfBirth === "") {
            // swal({ icon: 'error', text: "Place of birth is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (PhoneNumber === "") {
            // swal({ icon: 'error', text: "Phone number is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (Zipcode === "") {
            // swal({ icon: 'error', text: "Zipcode is empty." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        else if (Selfie === "") {
            // swal({ icon: 'error', text: "Selfie is required." });
            return this.setState({ emptyFieldMsg: "Please fill all fields" });           
            isValid = false;
        }
        if (!isValid || this.state.kycVerified) {
            return false;
        }
        try {
            this.props.setIsLoaderActive(true);
            let token = localStorage.getItem(AuthenticationTokenId);
            let response = await SendHttpRequest(BaseUrl + "/SaveKYC",
                {
                    Token: token,
                    FirstName: this.state.kyc.FirstName,
                    LastName: this.state.kyc.LastName,
                    Address: this.state.kyc.Address,
                    DateofBirth: this.state.kyc.DOB,
                    ZipCode: this.state.kyc.Zipcode,
                    CountryOfResidence: this.state.kyc.CountryOfResidence,
                    PlaceOfBirth: this.state.kyc.PlaceOfBirth,
                    IdCardFront: this.state.kyc.Selfie.split(",")[1],
                    PhoneNumber: this.state.kyc.PhoneNumber
                }
                , "POST");
            if (response.Success == true) {
                this.setState({ kycVerified: true });
            } else {
                this.setState({ kycVerified: false });
            }
            this.props.setIsLoaderActive(false);
        } catch (error) {
            this.props.setIsLoaderActive(false);
            this.setState({ kycVerified: false });
            return swal({
                icon: 'error',
                text: 'Something went wrong, try to re-login'
            })
        }
    }
    render() {
        return (
            <div>
                <div className="col-sm-9">
                    <h2 className="kycHeading">KYC</h2>

                </div>
                <div className="col-sm-3">

                </div>
                <div className="container-fluid body-content mx-auto">
                    <div className="card">
                        <form onSubmit={(event) => { this.SaveInvoice(event) }} >
                            <div className="row kyc-form">
                                <div className="mx-auto col-md-8 col-sm-12 col-12 col-lg-12">
                                    {this.state.kycVerified && <div className="alert" role="alert" style={{ padding: 15 }}>
                                        <i style={{ color: "green" }} className="fa fa-check"></i>{" "}Your KYC has been submitted.
</div>}


                                    <div className="form-group row">
                                        <label htmlFor="firstname" className="col-sm-2 col-form-label TEXTFIELD_FIRST" style={{ fontWeight: "bold", textTransform: "uppercase" }}>First Name</label>
                                        <div className="col-sm-4">
                                            <input disabled={this.state.kycVerified ? "disabled" : ""} type="text" name="firstname" onChange={(e) => {
                                                this.setState({ kyc: { ...this.state.kyc, FirstName: e.target.value } });
                                            }} className="form-control" value={this.state.kyc.FirstName} placeholder="First name" />
                                        </div>
                                        <label htmlFor="lastname" className="col-sm-2 col-form-label TEXTFIELD_LAST" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Last Name</label>
                                        <div className="col-sm-4">
                                            <input disabled={this.state.kycVerified ? "disabled" : ""} type="text" name="lastname" onChange={(e) => {
                                                this.setState({ kyc: { ...this.state.kyc, LastName: e.target.value } });
                                            }} className="form-control" value={this.state.kyc.LastName} placeholder="Last name" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="DOB" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Date of Birth</label>
                                        <div className="col-sm-4">
                                            <DatePicker className="form-control" placeholderText="Date of Birth" onChange={(date) => {
                                                this.setState({ kyc: { ...this.state.kyc, DOB: date } });
                                            }}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                selected={this.state.kyc.DOB}
                                                disabled={this.state.kycVerified}
                                            ></DatePicker>
                                        </div>
                                        <label htmlFor="address" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Address</label>
                                        <div className="col-sm-4">
                                            <input disabled={this.state.kycVerified ? "disabled" : ""} type="text" name="address" onChange={(e) => {
                                                this.setState({ kyc: { ...this.state.kyc, Address: e.target.value } });
                                            }} className="form-control" value={this.state.kyc.Address} placeholder="Address" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="CountryOfResidence" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Country of Residence:</label>
                                        <div className="col-sm-4">
                                            <select disabled={this.state.kycVerified ? "disabled" : ""} className="form-control" onChange={(e) => {
                                                this.setState({ kyc: { ...this.state.kyc, CountryOfResidence: e.target.value } });
                                            }}
                                                name="CountryOfResidence" value={this.state.kyc.CountryOfResidence}>
                                                <option value="">Select Country of Residence</option>
                                                <option value="Afghanistan">Afghanistan</option>
                                                <option value="Albania">Albania</option>
                                                <option value="Algeria">Algeria</option>
                                                <option value="American Samoa">American Samoa</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Anguilla">Anguilla</option>
                                                <option value="Antarctica">Antarctica</option>
                                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Aruba">Aruba</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Azerbaijan">Azerbaijan</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bahrain">Bahrain</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Belarus">Belarus</option>
                                                <option value="Belgium">Belgium</option>
                                                <option value="Belize">Belize</option>
                                                <option value="Benin">Benin</option>
                                                <option value="Bermuda">Bermuda</option>
                                                <option value="Bhutan">Bhutan</option>
                                                <option value="Bolivia">Bolivia</option>
                                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                <option value="Botswana">Botswana</option>
                                                <option value="Bouvet Island">Bouvet Island</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                <option value="Bulgaria">Bulgaria</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Cambodia">Cambodia</option>
                                                <option value="Cameroon">Cameroon</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Cape Verde">Cape Verde</option>
                                                <option value="Cayman Islands">Cayman Islands</option>
                                                <option value="Central African Republic">Central African Republic</option>
                                                <option value="Chad">Chad</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Christmas Island">Christmas Island</option>
                                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Comoros">Comoros</option>
                                                <option value="Congo">Congo</option>
                                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                                <option value="Cook Islands">Cook Islands</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                                <option value="Croatia">Croatia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Cyprus">Cyprus</option>
                                                <option value="Czech Republic">Czech Republic</option>
                                                <option value="Denmark">Denmark</option>
                                                <option value="Djibouti">Djibouti</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Dominican Republic">Dominican Republic</option>
                                                <option value="Ecuador">Ecuador</option>
                                                <option value="Egypt">Egypt</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                <option value="Eritrea">Eritrea</option>
                                                <option value="Estonia">Estonia</option>
                                                <option value="Ethiopia">Ethiopia</option>
                                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                                <option value="Faroe Islands">Faroe Islands</option>
                                                <option value="Fiji">Fiji</option>
                                                <option value="Finland">Finland</option>
                                                <option value="France">France</option>
                                                <option value="French Guiana">French Guiana</option>
                                                <option value="French Polynesia">French Polynesia</option>
                                                <option value="French Southern Territories">French Southern Territories</option>
                                                <option value="Gabon">Gabon</option>
                                                <option value="Gambia">Gambia</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Gibraltar">Gibraltar</option>
                                                <option value="Greece">Greece</option>
                                                <option value="Greenland">Greenland</option>
                                                <option value="Grenada">Grenada</option>
                                                <option value="Guadeloupe">Guadeloupe</option>
                                                <option value="Guam">Guam</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guinea">Guinea</option>
                                                <option value="Guinea-bissau">Guinea-bissau</option>
                                                <option value="Guyana">Guyana</option>
                                                <option value="Haiti">Haiti</option>
                                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hong Kong">Hong Kong</option>
                                                <option value="Hungary">Hungary</option>
                                                <option value="Iceland">Iceland</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                                <option value="Iraq">Iraq</option>
                                                <option value="Ireland">Ireland</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Jordan">Jordan</option>
                                                <option value="Kazakhstan">Kazakhstan</option>
                                                <option value="Kenya">Kenya</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                                <option value="Korea, Republic of">Korea, Republic of</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                <option value="Latvia">Latvia</option>
                                                <option value="Lebanon">Lebanon</option>
                                                <option value="Lesotho">Lesotho</option>
                                                <option value="Liberia">Liberia</option>
                                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                                <option value="Liechtenstein">Liechtenstein</option>
                                                <option value="Lithuania">Lithuania</option>
                                                <option value="Luxembourg">Luxembourg</option>
                                                <option value="Macao">Macao</option>
                                                <option value="North Macedonia">North Macedonia</option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Malawi">Malawi</option>
                                                <option value="Malaysia">Malaysia</option>
                                                <option value="Maldives">Maldives</option>
                                                <option value="Mali">Mali</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marshall Islands">Marshall Islands</option>
                                                <option value="Martinique">Martinique</option>
                                                <option value="Mauritania">Mauritania</option>
                                                <option value="Mauritius">Mauritius</option>
                                                <option value="Mayotte">Mayotte</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                <option value="Monaco">Monaco</option>
                                                <option value="Mongolia">Mongolia</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Morocco">Morocco</option>
                                                <option value="Mozambique">Mozambique</option>
                                                <option value="Myanmar">Myanmar</option>
                                                <option value="Namibia">Namibia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Netherlands">Netherlands</option>
                                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                <option value="New Caledonia">New Caledonia</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Nicaragua">Nicaragua</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Niue">Niue</option>
                                                <option value="Norfolk Island">Norfolk Island</option>
                                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                                <option value="Norway">Norway</option>
                                                <option value="Oman">Oman</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Palau">Palau</option>
                                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                                <option value="Panama">Panama</option>
                                                <option value="Papua New Guinea">Papua New Guinea</option>
                                                <option value="Paraguay">Paraguay</option>
                                                <option value="Peru">Peru</option>
                                                <option value="Philippines">Philippines</option>
                                                <option value="Pitcairn">Pitcairn</option>
                                                <option value="Poland">Poland</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Puerto Rico">Puerto Rico</option>
                                                <option value="Qatar">Qatar</option>
                                                <option value="Reunion">Reunion</option>
                                                <option value="Romania">Romania</option>
                                                <option value="Russian Federation">Russian Federation</option>
                                                <option value="Rwanda">Rwanda</option>
                                                <option value="Saint Helena">Saint Helena</option>
                                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                <option value="Saint Lucia">Saint Lucia</option>
                                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                                <option value="Samoa">Samoa</option>
                                                <option value="San Marino">San Marino</option>
                                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                <option value="Saudi Arabia">Saudi Arabia</option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Sierra Leone">Sierra Leone</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Slovakia">Slovakia</option>
                                                <option value="Slovenia">Slovenia</option>
                                                <option value="Solomon Islands">Solomon Islands</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                                <option value="Spain">Spain</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Sudan">Sudan</option>
                                                <option value="Suriname">Suriname</option>
                                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                <option value="Swaziland">Swaziland</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                                <option value="Tajikistan">Tajikistan</option>
                                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Timor-leste">Timor-leste</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Tokelau">Tokelau</option>
                                                <option value="Tonga">Tonga</option>
                                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                <option value="Tunisia">Tunisia</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="Turkmenistan">Turkmenistan</option>
                                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="Ukraine">Ukraine</option>
                                                <option value="United Arab Emirates">United Arab Emirates</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="United States">United States</option>
                                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                                <option value="Uruguay">Uruguay</option>
                                                <option value="Uzbekistan">Uzbekistan</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Viet Nam">Viet Nam</option>
                                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                <option value="Western Sahara">Western Sahara</option>
                                                <option value="Yemen">Yemen</option>
                                                <option value="Zambia">Zambia</option>
                                                <option value="Zimbabwe">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <label htmlFor="PlaceOfBirth" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Place of Birth:</label>
                                        <div className="col-sm-4">
                                            <select disabled={this.state.kycVerified ? "disabled" : ""} className="form-control" onChange={(e) => {
                                                this.setState({ kyc: { ...this.state.kyc, PlaceOfBirth: e.target.value } });
                                            }}
                                                name="PlaceOfBirth"
                                                value={this.state.kyc.PlaceOfBirth}>
                                                <option value="">Select Country of Birth</option>
                                                <option value="Afghanistan">Afghanistan</option>
                                                <option value="Albania">Albania</option>
                                                <option value="Algeria">Algeria</option>
                                                <option value="American Samoa">American Samoa</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Anguilla">Anguilla</option>
                                                <option value="Antarctica">Antarctica</option>
                                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Aruba">Aruba</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Azerbaijan">Azerbaijan</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bahrain">Bahrain</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Belarus">Belarus</option>
                                                <option value="Belgium">Belgium</option>
                                                <option value="Belize">Belize</option>
                                                <option value="Benin">Benin</option>
                                                <option value="Bermuda">Bermuda</option>
                                                <option value="Bhutan">Bhutan</option>
                                                <option value="Bolivia">Bolivia</option>
                                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                <option value="Botswana">Botswana</option>
                                                <option value="Bouvet Island">Bouvet Island</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                <option value="Bulgaria">Bulgaria</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Cambodia">Cambodia</option>
                                                <option value="Cameroon">Cameroon</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Cape Verde">Cape Verde</option>
                                                <option value="Cayman Islands">Cayman Islands</option>
                                                <option value="Central African Republic">Central African Republic</option>
                                                <option value="Chad">Chad</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Christmas Island">Christmas Island</option>
                                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Comoros">Comoros</option>
                                                <option value="Congo">Congo</option>
                                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                                <option value="Cook Islands">Cook Islands</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                                <option value="Croatia">Croatia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Cyprus">Cyprus</option>
                                                <option value="Czech Republic">Czech Republic</option>
                                                <option value="Denmark">Denmark</option>
                                                <option value="Djibouti">Djibouti</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Dominican Republic">Dominican Republic</option>
                                                <option value="Ecuador">Ecuador</option>
                                                <option value="Egypt">Egypt</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                <option value="Eritrea">Eritrea</option>
                                                <option value="Estonia">Estonia</option>
                                                <option value="Ethiopia">Ethiopia</option>
                                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                                <option value="Faroe Islands">Faroe Islands</option>
                                                <option value="Fiji">Fiji</option>
                                                <option value="Finland">Finland</option>
                                                <option value="France">France</option>
                                                <option value="French Guiana">French Guiana</option>
                                                <option value="French Polynesia">French Polynesia</option>
                                                <option value="French Southern Territories">French Southern Territories</option>
                                                <option value="Gabon">Gabon</option>
                                                <option value="Gambia">Gambia</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Gibraltar">Gibraltar</option>
                                                <option value="Greece">Greece</option>
                                                <option value="Greenland">Greenland</option>
                                                <option value="Grenada">Grenada</option>
                                                <option value="Guadeloupe">Guadeloupe</option>
                                                <option value="Guam">Guam</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guinea">Guinea</option>
                                                <option value="Guinea-bissau">Guinea-bissau</option>
                                                <option value="Guyana">Guyana</option>
                                                <option value="Haiti">Haiti</option>
                                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hong Kong">Hong Kong</option>
                                                <option value="Hungary">Hungary</option>
                                                <option value="Iceland">Iceland</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                                <option value="Iraq">Iraq</option>
                                                <option value="Ireland">Ireland</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Jordan">Jordan</option>
                                                <option value="Kazakhstan">Kazakhstan</option>
                                                <option value="Kenya">Kenya</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                                <option value="Korea, Republic of">Korea, Republic of</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                <option value="Latvia">Latvia</option>
                                                <option value="Lebanon">Lebanon</option>
                                                <option value="Lesotho">Lesotho</option>
                                                <option value="Liberia">Liberia</option>
                                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                                <option value="Liechtenstein">Liechtenstein</option>
                                                <option value="Lithuania">Lithuania</option>
                                                <option value="Luxembourg">Luxembourg</option>
                                                <option value="Macao">Macao</option>
                                                <option value="North Macedonia">North Macedonia</option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Malawi">Malawi</option>
                                                <option value="Malaysia">Malaysia</option>
                                                <option value="Maldives">Maldives</option>
                                                <option value="Mali">Mali</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marshall Islands">Marshall Islands</option>
                                                <option value="Martinique">Martinique</option>
                                                <option value="Mauritania">Mauritania</option>
                                                <option value="Mauritius">Mauritius</option>
                                                <option value="Mayotte">Mayotte</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                <option value="Monaco">Monaco</option>
                                                <option value="Mongolia">Mongolia</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Morocco">Morocco</option>
                                                <option value="Mozambique">Mozambique</option>
                                                <option value="Myanmar">Myanmar</option>
                                                <option value="Namibia">Namibia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Netherlands">Netherlands</option>
                                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                <option value="New Caledonia">New Caledonia</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Nicaragua">Nicaragua</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Niue">Niue</option>
                                                <option value="Norfolk Island">Norfolk Island</option>
                                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                                <option value="Norway">Norway</option>
                                                <option value="Oman">Oman</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Palau">Palau</option>
                                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                                <option value="Panama">Panama</option>
                                                <option value="Papua New Guinea">Papua New Guinea</option>
                                                <option value="Paraguay">Paraguay</option>
                                                <option value="Peru">Peru</option>
                                                <option value="Philippines">Philippines</option>
                                                <option value="Pitcairn">Pitcairn</option>
                                                <option value="Poland">Poland</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Puerto Rico">Puerto Rico</option>
                                                <option value="Qatar">Qatar</option>
                                                <option value="Reunion">Reunion</option>
                                                <option value="Romania">Romania</option>
                                                <option value="Russian Federation">Russian Federation</option>
                                                <option value="Rwanda">Rwanda</option>
                                                <option value="Saint Helena">Saint Helena</option>
                                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                <option value="Saint Lucia">Saint Lucia</option>
                                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                                <option value="Samoa">Samoa</option>
                                                <option value="San Marino">San Marino</option>
                                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                <option value="Saudi Arabia">Saudi Arabia</option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Sierra Leone">Sierra Leone</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Slovakia">Slovakia</option>
                                                <option value="Slovenia">Slovenia</option>
                                                <option value="Solomon Islands">Solomon Islands</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                                <option value="Spain">Spain</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Sudan">Sudan</option>
                                                <option value="Suriname">Suriname</option>
                                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                <option value="Swaziland">Swaziland</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                                <option value="Tajikistan">Tajikistan</option>
                                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Timor-leste">Timor-leste</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Tokelau">Tokelau</option>
                                                <option value="Tonga">Tonga</option>
                                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                <option value="Tunisia">Tunisia</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="Turkmenistan">Turkmenistan</option>
                                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="Ukraine">Ukraine</option>
                                                <option value="United Arab Emirates">United Arab Emirates</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="United States">United States</option>
                                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                                <option value="Uruguay">Uruguay</option>
                                                <option value="Uzbekistan">Uzbekistan</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Viet Nam">Viet Nam</option>
                                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                <option value="Western Sahara">Western Sahara</option>
                                                <option value="Yemen">Yemen</option>
                                                <option value="Zambia">Zambia</option>
                                                <option value="Zimbabwe">Zimbabwe</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="Zipcode" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>ZIP CODE</label>
                                        <div className="col-sm-4">
                                            <input disabled={this.state.kycVerified ? "disabled" : ""} type="text" name="Zipcode" onChange={(e) => {
                                                this.setState({ kyc: { ...this.state.kyc, Zipcode: e.target.value } });
                                            }} className="form-control" value={this.state.kyc.Zipcode} placeholder="Zipcode" />
                                        </div>
                                        <label htmlFor="PhoneNumber" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Contact Number</label>
                                        <div className="col-sm-4 ">
                                            <input disabled={this.state.kycVerified ? "disabled" : ""} type="text" name="PhoneNumber" onChange={(e) => {
                                                if (e.target.value === "") {
                                                    this.setState({ kyc: { ...this.state.kyc, PhoneNumber: e.target.value } });
                                                    return true;
                                                }
                                                if (Number.isInteger(Number(e.target.value)) && e.target.value.indexOf(" ") < 0 && e.target.value.indexOf(".") < 0 && e.target.value.length < 25) {
                                                    if (Number.parseInt(e.target.value) < 0) {
                                                        return false
                                                    }
                                                    this.setState({ kyc: { ...this.state.kyc, PhoneNumber: e.target.value } });
                                                    return true;
                                                }
                                                return false
                                            }} className="form-control" value={this.state.kyc.PhoneNumber} placeholder="Phone number" />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        {!this.state.kycVerified && <div className="row"><label htmlFor="Selfie" className="col-sm-2 col-form-label" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Take Selfie:</label>

                                            <Dropzone
                                                disabled={this.state.kycVerified}
                                                onDropAccepted={this.onPreviewDrop.bind(this)}
                                                accept=".png"
                                                maxSize={5000000}
                                                onDropRejected={(files) => {
                                                    swal({
                                                        icon: 'error',
                                                        text: 'file must be of format .png and size less then 5MB',
                                                    })
                                                }}
                                                multiple={false}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <section className="col-sm-10">
                                                        <div {...getRootProps()} style={{
                                                            background: "rgb(255,255,255,0.3)",
                                                            borderWidth: 2,
                                                            borderColor: "white",
                                                            borderStyle: "dashed",
                                                            borderRadius: 5,
                                                            width: "100%",
                                                            height: 50,
                                                            display: "flex",
                                                            alignContent: "center",
                                                            textAlign: "center",
                                                        }}>
                                                            <div className="mx-auto" style={{ display: "flex", alignItems: "center" }}>
                                                                <input {...getInputProps()} />
                                                                <p >Drag and drop or click to {(this.state.kyc.Selfie === "") ? "select a image to upload." : "change upload image."}</p>
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                            <span className="error">{this.state.emptyFieldMsg}</span>
                                        </div>
                                        }
                                        {this.state.kyc.Selfie !== "" ? <div>
                                            <div>{<img style={{
                                                display: 'inline',
                                                width: "100%",
                                                height: "auto",
                                            }} alt="" src={(this.state.kyc.Selfie.indexOf("/png;") > 0) ? this.state.kyc.Selfie : ImageBaseUrl + this.state.kyc.Selfie} />}

                                            </div>
                                        </div> : null}
                                    </div>

                                    {!this.state.kycVerified && <div className="form-group" style={{ display: "flex" }}>
                                        <button className="saveKycButton "
                                            type="submit"
                                        >
                                            <CheckSquare style={{ width: 18, marginRight: 5, fontWeight: "bold" }} />
                                        SAVE</button>
                                    </div>
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    onPreviewDrop = (files) => {

        if (files !== [] && files.length > 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                this.setState({
                    kyc: { ...this.state.kyc, Selfie: e.target.result }
                })
            }.bind(this);
            reader.readAsDataURL(files[0]);
        }
    }
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(KYC);

