import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'

class CreateNFT extends React.Component {

    constructor() {
        super()
        this.state = {
            // selectedFile: null,
            // optionValue: "",
            file: [],
            Name:"",
            ExternalLink:"",
            Description:"",
            Price:null,
            BlockChainName:"",

        };
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

        upload(e) {
            e.preventDefault()
            console.log(this.state.file)
        }

    // handleSelect = (e) => {
    //     console.log(e.target.value);
    //     this.setState({optionValue:e.target.value});
    // };

    // onFileChange = event => {
    //     this.setState({ selectedFile: event.target.files[0] });
    // };

    // onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append(
    //         "myFile",
    //         this.state.selectedFile,
    //         this.state.selectedFile.name
    //     );
    //     console.log(this.state.selectedFile);
    //     axios.post("api/uploadfile", formData);
    // };

    // fileData = () => {
    //     if (this.state.selectedFile) {
    //         return (
    //             <div style={{textAlign:"center",justifyContent:"center",display:"flex"}}>
    //                 <h2>File Details:</h2>

    //                 <div >File Type: {this.state.selectedFile}</div>
    //                 <p>
    //                     Last Modified:{" "}
    //                     {this.state.selectedFile.lastModifiedDate.toDateString()}
    //                 </p>

    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div>
    //                 <p>Please Select PNG, JPG, JPEG Or GIF</p>
    //             </div>
    //         )
    //     }
    // };



    componentDidMount() {
        this.submit()
    }
    
    // PostNFT(){
    //     const headers = { 
          
    //         headers:{
    //             accept: "text/plain",
    //             "Content-Type": "multipart/form-data",
    //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXZhbHVlIjoiWElHSXRZZzRIWml5MnJlNStoUk8zQT09IiwieC10eXBlIjoib3lyUXB3YjdzQnU5STRUVU9ZV0J5UT09IiwibmJmIjoxNjQ0MzI1ODM2LCJleHAiOjE2NDY5MTc4MzYsImlhdCI6MTY0NDMyNTgzNn0.rZh2Hb5UGV7MqFaJUd_cTmOeJw4H8YGIARPrdYaB-VM',
    //        }
    //     };
    //     axios.post('http://198.187.28.244:7577/api/v1/Amin/AddNft' , headers)
    //         .then((response)=>{
    //             this.setState({articleId:response.data.id})
    //         });
    // }

    // submit(){
    //     let data = this.state;
    //     axios({
    //         method:"POST",
    //         url:"http://198.187.28.244:7577/api/v1/Amin/AddNft",
    //         accept: "text/plain",
    //         Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXZhbHVlIjoiWElHSXRZZzRIWml5MnJlNStoUk8zQT09IiwieC10eXBlIjoib3lyUXB3YjdzQnU5STRUVU9ZV0J5UT09IiwibmJmIjoxNjQ0Mzg1ODgzLCJleHAiOjE2NDY5Nzc4ODMsImlhdCI6MTY0NDM4NTg4M30.KsPGWaEKyRQWK7yqwWt9jmI3gTViZXXtXwnwB4ThXUw",
            
    //     }).then((resp)=>{
    //         this.setState({resp:data})
    //         console.warn(resp);
    //     })

    // }

    
    submit =(data)=>{
        var bodyFormData = new FormData();
        bodyFormData.append("Name", "string");
        bodyFormData.append("ExternalLink", "string");
        bodyFormData.append("Description", "string");
        bodyFormData.append("Price", 'string');
        bodyFormData.append("BlockChainName ", "string");
        // var formData = new formData()
        // formData.append("File" , "");
        // formData.append("Name" , "");
        // formData.append("ExternalLink" , "");
        // formData.append("Description" , "");
        // formData.append("Price" , "");
        // formData.append("BlockChainName" , "");


        // let url="http://198.187.28.244:7577/api/v1/Amin/AddNft";
        // let data=this.state;
        // fetch(url,{
        //     method:'POST',
        //     headers:{
        //         accept: "text/plain",
        //         Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXZhbHVlIjoiWElHSXRZZzRIWml5MnJlNStoUk8zQT09IiwieC10eXBlIjoib3lyUXB3YjdzQnU5STRUVU9ZV0J5UT09IiwibmJmIjoxNjQ0Mzg1ODgzLCJleHAiOjE2NDY5Nzc4ODMsImlhdCI6MTY0NDM4NTg4M30.KsPGWaEKyRQWK7yqwWt9jmI3gTViZXXtXwnwB4ThXUw",
        //     },
        //     body:JSON.stringify (data)
        // }).then((resp)=>{
        //     console.warn( "kjkfhdsakfhkda",resp);
        //     alert("data is submited")
        // })

        axios({
            method:"POST",
            url:"http://198.187.28.244:7577/api/v1/Amin/AddNft",

            data:{bodyFormData},
            headers:{
                accept: "text/plain",
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXZhbHVlIjoiWElHSXRZZzRIWml5MnJlNStoUk8zQT09IiwieC10eXBlIjoib3lyUXB3YjdzQnU5STRUVU9ZV0J5UT09IiwibmJmIjoxNjQ0Mzg1ODgzLCJleHAiOjE2NDY5Nzc4ODMsImlhdCI6MTY0NDM4NTg4M30.KsPGWaEKyRQWK7yqwWt9jmI3gTViZXXtXwnwB4ThXUw",
                "Content-Type": "multipart/form-data"
            }
        }).then((response)=>{
            console.log(response);
        })
    }



    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt="NFT Img" className='imgSet' name='file'
            value={this.state.file}
            onChange={(data)=>{this.setState({file:data.target.value})}}/>;
        }
        return (
            <div className='container'>
                <h1 className='f-Heading'>Create NFT</h1>

                <div className='container-fluid-1 col-sm-12 col-lg-12 '>
                    <p style={{ cursor: "pointer", marginTop: "-3%" }}>
                        Upload file!
                    </p>
                    <div className='upload-section '>
                        <input type="file" onChange={this.uploadSingleFile} className="inputSec" />
                    </div>

                    <div className='prevItem'>
                        <p style={{ cursor: "pointer", marginTop: "-15%" }}>
                            Preview item
                        </p>
                        <div style={{height:"55%"}}>
                       
                            <div className='prevItmImgSec'>
                            <img
                              src={avatar}
                              alt="profileImage"
                              className="avatar-immage"
                            />
                        {imgPreview}
                        </div>
                        </div>
                        <div>
                            <h6 className='imgSecInfoo'>Item Title</h6>
                            <h6 className='imgSecInfo'>Item prrice</h6>
                            <h6 className='imgSecInfo'>Buy NFT</h6>
                        </div>

                    </div>



                </div>
                <div className="col-md-12 padding-0">
                    <div className='input-fields'>
                        <p>Name</p>
                        <input
                            type="text"
                            required
                            // placeholder="e.g 'Crypto Funk' "
                            placeholder='Enter Your Name'
                            width={100}
                            className="input-field"
                            name='Name'
                            value={this.state.Name}
                            onChange={(data)=>{this.setState({Name:data.target.value})}}
                        />
                    </div>

                    <div className='input-fields'>
                        <p>External Link</p>
                        <input
                            type="text"
                            required
                            placeholder="e.g 'https://www.yoursite.com/item/123' "
                            width={100}
                            className="input-field"
                            name='ExternalLink'
                            value={this.state.ExternalLink}
                            onChange={(data)=>{this.setState({ExternalLink:data.target.value})}}
                        />
                    </div>


                    <div className='input-fields'>
                        <p>Description</p>
                        <input
                            type="text"
                            required
                            placeholder="e.g 'this is very limited item' "
                            width={100}
                            className="description-field"
                            name='Description'
                            value={this.state.Description}
                            onChange={(data)=>{this.setState({Description:data.target.value})}}
                        />
                    </div>

                    <div className='input-fields'>
                        <p>Category</p>
                        <select className='dropDown'>
                            <option>Select Collection</option>
                        </select>
                    </div>

                    <hr style={{ width: "60%", marginLeft: "0%" }} />

                    <div className='input-fields'>
                        <p>Price</p>
                        <input
                            type="text"
                            required
                            placeholder="enter Price for one item[BNB] "
                            width={100}
                            className="input-field"
                            name='Price'
                            value={this.state.Price}
                            onChange={(data)=>{this.setState({Price:data.target.value})}}
                        />
                    </div>

                    <div className='input-fields'>
                        <p>blockchain</p>
                        <select className='dropDown' name='BlockChainName' value={this.state.BlockChainName} onChange={(data)=>{this.setState({BlockChainName:data.target.value})}}>
                            {/* <option>Select blockchain</option> */}
                            <option>Select blockchain</option>
                            <option>Select BNB</option>
                            <option>Select EHTEREUM</option>
                            <option>Select SOLIDITY</option>
                        </select>
                    </div>

                    <div className='input-fields'>
                        <p>Payment tokens</p>
                        <select className='dropDown'>
                            <option>Select PaymentToken</option>
                            <option>Select BNBToken</option>
                            <option>Select ETHToken</option>

                        </select>
                    </div>
                    <div style={{ display: "flex" }}>
                        <button className='btnStyle' onClick={()=>{this.submit()}}>Create Item</button>
                        <button className='btnStyle'>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateNFT;