import React, { Component, useEffect, useState } from "react";
import { components } from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassisEditor from 'ckeditor5-custom-build/build/ckeditor'
import swal from "sweetalert";
import {
    BaseUrl,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";
import { Multiselect } from "multiselect-react-dropdown";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { setIsLoaderActive } from "../actions/index";
import SharedLayout from "./shared/SharedLayout";
export default function Editblog() {
    const [Titlevalidation,setTitlevalidation]=useState(true)
    const [Imagevalidation,setImagevalidation]=useState(true)
    const [Tagsvalidation,setTagsvalidation]=useState(true)
  
    const [Title, setTitle] = useState("")
    const [Image, setImage] = useState("")
     const [Tags, setTags] = useState([])
    const[TagsArray,setTagsArray]=useState([]);
    const[PreTagsArray,setpreTagsArray]=useState([]);
    const [ImagePreview, setImagePreview] = useState({})
    const [Imageset, setImageset] = useState(false)
    const [ImageModal, setImageModal] = useState(false)
    const [selected, setSelected] = useState([]);
    const [Thumbnail, setThumbnail] = useState("this is Thumbnail");
    const [description, setdescription] = useState("");
    const [preselectedcategories, setpreselectedcategories] = useState([])
    const [ReadingTimeMinutes, setReadingTimeMinutes] = useState(3);
    const [temparray, settemparray] = useState([])
    const [Id, setId] = useState(0);
    const dispatch = useDispatch();
    const History=useHistory();
    const [Missingtag,setMissing]=useState(false);
    const [   uploaded, setuploaded] = useState(true);
    const [tagsvalue, settagsvalue] = useState("")
    const [allcategories, Setallcategories] = useState([])
    useEffect(() => {
        Categories()
        GetBlogData()
    }, [])

    const Categories = async () => {
        try {
            const data = await SendHttpRequest(
                BaseUrl + "/Blog/GetAllCategory?PageSize=0&CurrentPage=0",
                {},
                "GET"
            );
            if (data.isSuccess) {
                Setallcategories(data.data)
            } else {
            }
        } catch (error) {
            return;
        }
    }

    const GetBlogData = async () => {
        try {
            const data = await SendHttpRequest(
                BaseUrl + "/Blog/GetBlogBySlugUrl?slugUrl=" + localStorage.getItem("blogslugUrl"),
                {},
                "GET"
            );
            if (data.isSuccess) 
            {
                setId(data.data.id)
               
                setTitle(data.data.title)
                data.data.description ? setdescription(data.data.description) : setdescription(<p>da</p>)
                setImage(data.data.image)
                 setImageset(true)
                 const categoryname = data.data.blogCategories?.map((x)=> {
                    return(
                        {"categoryId" : x.categoryId,"categoryName" : x.categoryName}
                      )
                    }
                     )
                     console.log("preselected catedda",categoryname)  
                     setpreselectedcategories(categoryname)
                     setSelected(categoryname)
                 const tagName = data.data.blogTags?.map((x)=> {return(x.name)})
                            console.log("zzzazazazazefsafv",tagName)
                setpreTagsArray(tagName)     
                settagsvalue(tagName.toString().replaceAll(",",' '))
                let tagsstring=tagName.toString().replaceAll(",",' ')
                setpreTagsArray([])
                setpreTagsArray(tagsstring.split(" ").filter((x)=>x!=''))
                   const tagName1 = tagName.map((x)=> {    
                    return(
                      {"name" : x}
                    )
                  })
                            console.log("zzzazazazazefsafv1",tagName1)
                  setTagsArray(tagName1)  
            } 
            else {
            }
        } catch (error) {
            return;
        }
    }


    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return
        };
    }

    const handelckeditorstate = (event, editor) => {
        const data = editor.getData();
        setdescription(data)
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    function handletags(tags)
    {      settagsvalue(tags)
        setpreTagsArray([])
        setpreTagsArray(tags.split(" ").filter((x)=>x!=''))
           const tagName = PreTagsArray.map((x)=> {    
            return(
              {"name" : x.replaceAll("#",'')}
            )
          })
                    console.log("zzzazazazazefsafv",tagName)
          setTagsArray(tagName)  
    }
    function Submitdata() {
        let count=0;
        const name = /^[a-zA-Z0-9_ ]*$/;
        if(Title.match(name)&&Title.length>0){setTitlevalidation(true);}
        else {  setTitlevalidation(false);count++}
        if(Imageset==true) {setImagevalidation(true) ;    }
        else {setImagevalidation(false) ; count++}
        if(Missingtag==true) count++ 
        if(count>0) return
        dispatch(setIsLoaderActive(false));
        let temp = JSON.stringify(selected)
        temp = temp.replaceAll("categoryId", "id")
        temp = temp.replaceAll("categoryName", "name")
        var bodyFormData = new FormData();
        bodyFormData.append("Id", Id);
        bodyFormData.append("Title", Title);
        bodyFormData.append("Image", Image);
        bodyFormData.append("Thumbnail", Thumbnail);
        bodyFormData.append("Description", description);
        bodyFormData.append("ReadingTimeMinutes", ReadingTimeMinutes);
        bodyFormData.append("Tags", JSON.stringify(TagsArray));
        bodyFormData.append("Categories", temp);
        console.log("this is Id  :: ",Id)
        console.log("this is Title  :: ",Title)
        console.log("this is Image  :: ",Image)
        console.log("this is Thumbnail  :: ",Thumbnail)
        console.log("this is description  :: ",description)
        console.log("this is ReadingTimeMinutes  :: ",ReadingTimeMinutes)
        console.log("this is temparray  :: ",JSON.stringify(TagsArray))
        console.log("this is temp  :: ",temp)
        dispatch(setIsLoaderActive(true));
        axios({
            method: "POST",
            url: "https://api.fineoriginal.com/api/v1/Blog/SaveBlog",

            data: bodyFormData,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigneD"),
            }
        }).then((response) => {
            dispatch(setIsLoaderActive(false));
            if(response.data.message=="Data successfully added")
           {   Swal.fire({
             position: 'center',
             icon: 'success',
             title: response.data.message,
             showConfirmButton: false,
             timer: 1500
           })
           History.push("/ManageBlog")
        }
       else
       Swal.fire({
         position: 'center',
         icon: 'error',
         title: response.data.message,
         showConfirmButton: false,
         timer: 1500
       })

        }).catch((e) => {
            dispatch(setIsLoaderActive(false));
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "error",
                showConfirmButton: false,
                timer: 1500
              })
          })

    }

    function uploadPicture1(e) {
        setImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        setImageset(true)
        setuploaded(false)
    };

    const styles = {
        chips: {
            background: "red"
        },
        searchBox: {
            border: "none",
            width: "100%"
        },
        multiselectContainer: {
            color: "red",
            width: "100%"
        },
        inputField: { 
            width: "100%"
        },
    };

    return (
    <>
      <SharedLayout>
        <div className="container">
            <div className="row">
                <div className='col-md-12'> <h1 className='f-Heading'>Edit Blog</h1>
                             <Modal
                                    centered
                                    size="sm"
                                    show={ImageModal}
                                >
                                    <Modal.Body style={{textAlign:"center",height:"50%"}}>
                                   {
                                       uploaded?
                                  
                                    <img
                                    src={"https://api.fineoriginal.com/"+Image}
                                    style={{width:"100%" }  }
                                                                       />     
                                       : 
                                       <img
                                    src={ImagePreview}
                                    style={{width:"100%" }  }
                                                                       />     
                                   }
                               <button  onClick={()=>setImageModal(false)}> Close </button>                     
                                 </Modal.Body>
                                    <Modal.Footer>
                                       
                                    </Modal.Footer>
                                </Modal> 
                    <div className="col-md-12">
                        <div className='input-fields'>
                            <p>Title Image</p>
                            <input type="file" name="uploadfile" id="img" onChange={uploadPicture1} accept=".png, .jpg, .jpeg" style={{display:"none"}}/>
                            <label className='custom-input-field pt-2' style={{whiteSpace:"nowrap"}}>
                               <button  className="custom-input-button" ><label  for="img" className="input-field-custom-label"> Choose File </label></button> 
                                <l className="custom-input-label">{Image.toString().slice(-10)}</l> 
                                </label>
                            {Imageset ? <button onClick={() => setImageModal(true)}>Preview Image </button> : " "}
                            {Imagevalidation?<></>:<div style={{ color: "#F61C04" }}>Image is not set</div>}
        
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className='input-fields'>
                            <p>Title</p>
                            <input
                                type="text"
                                required
                                placeholder="Title"
                                width={100}
                                className="input-field"
                                name='ExternalLink'
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                                           {Titlevalidation?<></>:<div style={{ color: "#F61C04" }}>Title is not valid.</div>}
                 
                        </div>
                    </div>
                    {/* <div className="col-md-12">
                        <div className='input-fields'>
                            <p>Categories</p>
                            <Multiselect
                                options={allcategories}
                                displayValue="categoryName"
                                style={styles}
                                selectedValues={preselectedcategories}
                                onSelect={(selectedList)=>{setSelected(selectedList)}} // Function will trigger on select event
                                onRemove={(selectedList)=>{ setSelected(selectedList)}} // Function will trigger on remove event
                            />

                        </div>
                    </div> */}
                    <div className="col-md-12">
                        <div className='input-fields'>
                        {
                         PreTagsArray.length>0? 
                        PreTagsArray.map((name1)=>
                        name1.length>0?
                        <span className="mychips false false">{name1.replaceAll("#",'')} </span>
                                        :" "
                                        ):" "
                        }
                            <p>Enter Tags</p>
                            <input
                                type="text"
                                required
                                placeholder="#tags"
                                width={100}
                                value={tagsvalue}
                                className="input-field"
                                name='Tags'
                                onChange={(e)=>handletags(e.target.value)}
                            />
                              {Missingtag?<p style={{color:"red"}}> Hash Tag is Missing</p>:" "
               }
                        </div>
                    </div>
                    <div className="pt-2"></div>
                    <div className="col-md-12">
                        <div className='input-fields'>
                            <p>Description</p>
                            <CKEditor
                                editor={ClassisEditor}
                                onInit={editor => {
                                    //// Here the editor is ready to be used
                                }}
                                config={
                                    {
                                        extraPlugins: [uploadPlugin]
                                    }}
                                onReady={(editor) => { }}
                                onBlur={(event, editor) => { }}
                                onFocus={(event, editor) => { }}
                                onChange={handelckeditorstate}
                                data={description}
                            />
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div style={{ display: "flex" }}>
                            <button className='create-list' onClick={Submitdata}>Update Blog</button>   
                        </div>
                    </div>
                </div></div></div>
                </SharedLayout>
    </>
    );








    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("ProfileImage", file);
                        axios({
                            method: "POST",
                            url: "https://api.fineoriginal.com/api/v1/Blog/BlogPicture",

                            data: body,
                            headers: {
                                accept: "text/plain",
                                "Content-Type": "multipart/form-data",
                                Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigneD"),
                            }
                        }).then((res) => {
                            resolve({
                                default: `https://api.fineoriginal.com/${res.data.data}`
                            });
                        })
                            .catch((err) => {
                                swal({
                                    icon: "error",
                                    text: "Uploading Image failed",
                                });

                            });
                    });
                });
            }
        };
    }







}