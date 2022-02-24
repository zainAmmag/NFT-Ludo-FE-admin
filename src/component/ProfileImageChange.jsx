import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import {
  ImageBaseUrl,
  UserProfileTokenId,
  AuthenticationTokenId,
  BaseUrl,
} from "../Constants/BusinessManager";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";
import swal from "sweetalert";
import { SendHttpRequest } from "./utility";



export class ProfileImageChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      files: [],
      base64: "",
    };
  }

  onPreviewDrop = (files) => {
    if (files !== [] && files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        this.setState({
          base64: e.target.result,
        });
      }.bind(this);
      reader.readAsDataURL(files[0]);
      this.setState({
        files: files,
      });
    }
  };
  async Upload() {
    try {
      this.props.loader(true);
      let t = localStorage.getItem(AuthenticationTokenId);
      let b = this.state.base64 !== "" ? this.state.base64.split(",")[1] : "";
      this.setState({ show: false });
      let response = await SendHttpRequest(
        BaseUrl + "UpdateProfileImage",
        { Token: t, ImageUrl: b },
        "POST"
      );
      if (response.Success) {
        var user = JSON.parse(localStorage.getItem(UserProfileTokenId));
        localStorage.setItem(
          UserProfileTokenId,
          JSON.stringify({
            ProfileImage: response.Data,
            Email: user.Email,
          })
        );
        this.props.loader(false);
        return swal({
            icon: "success",
            title: "Done",
            text: "Your profile picture have been  updated",
          });
      } else {
        throw new Error(response.Exception);
      }
    } catch (error) {
        this.props.loader(false);
      return swal({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }
  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    var user = JSON.parse(localStorage.getItem(UserProfileTokenId));
    const modalCloseButton = {
      backgroundColor: "#fabf01",
      border: "none",
      padding: "6px 60px",
    };
    const modalUploadButton = {
      backgroundColor: "green",
      border: "none",
      padding: "6px 60px",
    };
    return (
      <>
        <div
          className=""
          style={{
            width: "150px",
            height: "150px",
            marginLeft: "20",
            display: "flex",
            overflow: "hidden",
            position: "relative",
            fontSize: "1.25rem",
            alignItems: "center",
            flexShrink: "0",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: "1",
            userSelect: "none",
            borderRadius: "50%",
            justifyContent: "center",
          }}
          onClick={handleShow}
        >
          <img
            src={
              user
                ? !user.ProfileImage || user.ProfileImage === ""
                  ? require("../Assets/images/profilePic.png")
                  : ImageBaseUrl + user.ProfileImage
                : require("../Assets/images/profilePic.png")
            }
            alt="profileImage"
            data-toggle="modal"
            data-target="#modal-animation-14"
            style={{
              color: "transparent",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              textAlign: "center",
              textIndent: "10000px",
            }}
          />
        </div>
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header style={{ background: "black" }}>
            <h5 className="modal-title">Upload Profile Picture</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group row">
              <div className="col-sm-10">
                <Dropzone
                  onDropAccepted={this.onPreviewDrop.bind(this)}
                  accept=".png,.jpg,.jpeg"
                  maxSize={2000000}
                  onDropRejected={(files) => {
                    swal({
                      icon: "error",
                      text:
                        "file must be of format .jpg, .jpeg or .png and size less then 2MB",
                    });
                  }}
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        style={{
                          background: "#4D4D4D",
                          borderWidth: 2,
                          borderColor: "#4D4D4D",
                          borderRadius: 5,
                          width: "100%",
                          height: 44,
                          display: "flex",
                          alignContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="mx-auto"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff",
                          }}
                        >
                          <input {...getInputProps()} />
                          <p>
                            Drag and drop or click to{" "}
                            {this.state.base64 === "" ? (
                              <>
                                <span
                                  style={{ color: "#64a964", fontWeight: 800 }}
                                >
                                  select
                                </span>{" "}
                                a image to upload.
                              </>
                            ) : (
                              <>
                                <span
                                  style={{ color: "#c54747", fontWeight: 800 }}
                                >
                                  change
                                </span>{" "}
                                upload image.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <span id="upladedImage"></span>
              </div>
            </div>
            <div className="row">
              <div className="col" style={{ color: "#fff" }}>
                <span>Image Format Allowed: jpg, jpeg, png </span>
                <br />
                <span>Max Image Size: 2MB</span>
              </div>
            </div>
            <div className="row">
              {this.state.files.length > 0 ? (
                <img
                  alt=""
                  style={{ maxWidth: "100%" }}
                  className="img img-responsive"
                  src={this.state.base64}
                />
              ) : null}
            </div>
            <Modal.Footer
            style={{ background: "transparent", background: "black" }}
          >
            {this.state.files.length > 0 ? (
              <Button
                variant="primary"
                onClick={this.Upload.bind(this)}
                style={modalUploadButton}
              >
                Upload
              </Button>
            ) : null}
            <Button
              variant="secondary"
              onClick={handleClose}
              style={modalCloseButton}
            >
              Close
            </Button>
          </Modal.Footer>
          </Modal.Body>
         
        </Modal>
      </>
    );
  }
}

export default ProfileImageChange;
