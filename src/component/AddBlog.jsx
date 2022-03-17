import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import  ClassisEditor from 'ckeditor5-custom-build/build/ckeditor'
import swal from "sweetalert";
import {
  BaseUrl,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";
import { Multiselect } from "multiselect-react-dropdown";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import Swal from 'sweetalert2'
import { setIsLoaderActive } from "../actions/index";
import { useDispatch } from "react-redux";
import '../Assets/css/custom.css'
import { useHistory } from "react-router-dom";
import SharedLayout from "./shared/SharedLayout";

export default function AddBlog() {
  
  const [allcategories,Setallcategories]=useState([])
  useEffect(()=>{
  Categories()
  },[])
  const Categories =async()=>
  {
    try {
        const data = await SendHttpRequest(
            BaseUrl + "/Blog/GetAllCategory?PageSize=0&CurrentPage=0",
            {},
            "GET"
        );
        if (data.isSuccess) 
        {
            console.log(data.data);
            Setallcategories(data.data)
            console.log(allcategories)
        } else {
            console.log("data" + data.message);
        }
       } catch (error) {
        // localStorage.clear();
        return;
    }
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      console.log(loader)
      return
    };
  }
  const [Titlevalidation,setTitlevalidation]=useState(true)
  const [Imagevalidation,setImagevalidation]=useState(true)
  const [Tagsvalidation,setTagsvalidation]=useState(true)

  const [Title, setTitle] = useState("")
  const [Tags, setTags] = useState([])
  const [Image, setImage] = useState("")
  const [ImagePreview, setImagePreview] = useState({})
  const [Imageset, setImageset] = useState(false)
  const [ImageModal, setImageModal] = useState(false)
  const [selected, setSelected] = useState([]);
  const[Thumbnail,setThumbnail]=useState("this is Thumbnail");
  const[description,setdescription]=useState("");
  const[ReadingTimeMinutes,setReadingTimeMinutes]=useState(3);
  const[Id,setId]=useState(0)
  const History=useHistory();
  const [Missingtag,setMissing]=useState(false);
  const dispatch = useDispatch();
  const[TagsArray,setTagsArray]=useState([]);
  const handelckeditorstate = (event, editor) => {
    const data = editor.getData();
     console.log(data)
    setdescription(data)
  }
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
          }) .then((res) => {
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
  function  CreateBlog(temp)
  {  
    let count=0;
    const name = /^[a-zA-Z0-9_ ]*$/;
    if(Title.match(name)&&Title.length>0){setTitlevalidation(true);}
    else {  setTitlevalidation(false);count++}
    if(Imageset==true) {setImagevalidation(true) ;    }
    else {setImagevalidation(false) ; count++}
    if(Missingtag==true) count++ 
    if(count>0) return
    let temp1 = JSON.stringify(TagsArray)
    console.log("Tags Array",temp1)
    console.log("Categories Array",temp)
    var bodyFormData = new FormData();
    bodyFormData.append("Id", Id);
    bodyFormData.append("Title",Title);
    bodyFormData.append("Image",Image);
    bodyFormData.append("Thumbnail", Thumbnail);
    bodyFormData.append("Description", description);
    bodyFormData.append("ReadingTimeMinutes", ReadingTimeMinutes);
    bodyFormData.append("Tags", JSON.stringify(TagsArray));
    bodyFormData.append("Categories",temp);
    dispatch(setIsLoaderActive(true));
    axios({
      method: "POST",
      url: "https://api.fineoriginal.com/api/v1/Blog/SaveBlog",

      data: bodyFormData,
      headers: {
          accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigneD"),
      }
  }).then((response) => {
    dispatch(setIsLoaderActive(false));
    if(response.data.message=="Data successfully added")
    {
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
      History.push("/ManageBlog")
    }
  else
  {   if(response.data.message=="Title Already Exist already exist")
           {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Blog Title already exist",
              showConfirmButton: false,
              timer: 1500
            })
           }
           else
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
}
     
      
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
  function onSelect(selectedList, selectedItem) {
    console.log("selectedde",selectedItem)
     setSelected(selectedList)      
  }

  
function handletags(tags)
{      
               
          setTags([])
          setTags(tags.split(" ").filter((x)=>x!=''))
          const tagName = Tags.map((x)=> {    
         return(
          {"name" : x.replaceAll("#",' ')}
        )
      })
     console.log("zzzazazazazefsafv",tagName)
      setTagsArray(tagName)
}
 function onRemove(selectedList, removedItem) {
  setSelected(selectedList)   
                   }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

 function Submitdata()
  {         

     
   console.log("catagories",selected)
    console.log("title",Title)
    console.log("description",description)
    console.log("TokenofAdminsigneD", localStorage.getItem("TokenofAdminsigneD"))
      console.log("length",description.length)
      console.log()
      let temp = JSON.stringify(selected)
      temp=temp.replaceAll("categoryId","id")
      temp=temp.replaceAll("categoryName","name")
      console.log(temp)
       CreateBlog(temp)  
  }
  function uploadPicture1 (e) {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
   setImagePreview( URL.createObjectURL(e.target.files[0]))
      setImageset(true)
    };
    const styles = {
      chips: {
        background: "red"
         },
      searchBox: {
        border: "none",
        width:"100%"
      },
      multiselectContainer: {
        color: "red",
        width:"100%"
      } ,
      inputField: { // To change input field position or margin
        width:"100%"
    },
    };
  return (
    <>
    <SharedLayout>
    <div className="container">
      <div className="row">
        <div className='col-md-12'> <h1 className='f-Heading'>Add Blog</h1>
        {console.log("arrayset",TagsArray)}
                                     <Modal
                                    centered
                                    size="sm"
                                    show={ImageModal}
                                
                                >
                                    <Modal.Body style={{textAlign:"center",height:"50%"}}>
                                    <img
                                    src={ImagePreview}
                                    style={{width:"100%" }  }
                                                                       />     
                               <button  onClick={()=>setImageModal(false)}> Close </button>                     
                                 </Modal.Body>
                                    <Modal.Footer>
                                       
                                    </Modal.Footer>
                                </Modal>
        <div className="col-md-12">
            <div className='input-fields'>
              <p>Title Image</p>
              <input type="file" onChange={uploadPicture1} className='inputimage input-fields' accept=".png, .jpg, .jpeg"/>
              {Imageset?  <button onClick={()=>setImageModal(true)}>Preview Image </button> :" "  }
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
                                        onChange={(e)=>setTitle(e.target.value) }
                                    />
                                 {Titlevalidation?<></>:<div style={{ color: "#F61C04" }}>Title is not valid.</div>}
                                 </div>
          </div>
          {/* <div className="col-md-12">
            <div className='input-fields'>
              <p>Ctegories</p>

            <Multiselect 
            options={allcategories} 
            displayValue="categoryName" 
             style={styles}  
             onSelect={onSelect} // Function will trigger on select event
             onRemove={onRemove} // Function will trigger on remove event
             />
             
          
            </div>
          </div> */}
          <div className="col-md-12">
            <div className='input-fields'>
          {
            Tags.length>0? 
            Tags.map((name1)=>
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
              />
            </div>
          </div>
          <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div style={{ display: "flex" }}>
                            <button className='create-list' onClick={Submitdata}>Add Blog</button>   
                        </div>
                    </div>
        
                               
        </div></div></div>
        </SharedLayout>
    </>
  );
}