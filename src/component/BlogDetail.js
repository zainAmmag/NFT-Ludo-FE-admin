import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoaderActive } from "../actions/index";
import { Redirect } from 'react-router-dom';
import { SendHttpRequest } from "../component/utility";
import Swal from "sweetalert2";
 import "../Assets/css/custom.css";
import {
    BaseUrl,
  } from "../Constants/BusinessManager";
import SharedLayout from "./shared/SharedLayout";
const BlogDetail = () => {
    const location = useLocation()
    const [blogData, setBlogData] = useState()
    const [description,setDescription]=useState(null)
    const [loader, setloader] = useState(true)
    const slug = location.slugName
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsLoaderActive(true));
        console.log("data is here slug", slug)
       GetBlogData()
    }, [])
    const GetBlogData = async () => {
        try {
            const data = await SendHttpRequest(
                BaseUrl + "/Blog/GetBlogBySlugUrl?slugUrl=" + localStorage.getItem("blogslugUrl"),
                {},
                "GET"
            );
            if (data.isSuccess) {
                console.log("DATATAT", data.data)
                setBlogData(data.data)
                let desc=data.data.description
                     console.log(desc)
                 setDescription(desc)
                console.log("len", data.data.blogCategories)
                setloader(false)
                dispatch(setIsLoaderActive(false));
            } else {
                dispatch(setIsLoaderActive(false));
                console.log("data" + data.message);
            }
        } catch (error) {
            dispatch(setIsLoaderActive(false));
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "error",
                showConfirmButton: false,
                timer: 1500
              })
            return;
        }
    }

    return (<>
                  <SharedLayout>
        <section class="blog-Detail-page relative">
            <div className="small-pnl secnd-anime">
                <div className="bg-layer"></div>
                <span className="circle-span anim small yelow position-1"></span>
                <span className="circle-span anim small green position-4"></span>
                <span className="circle-span anim small green position-6"></span>
                <span className="circle-span anim star rotate-anim position-7"></span>
                <span className="circle-span anim star rotate-anim position-8"></span>
                <span className="square-span anim small rotate-anim yelow position-9"></span>
                <span className="square-span anim small rotate-anim green position-10"></span>
                <span className="square-big-span yellow anim translate-anim-1 position-11"></span>
                <span className="square-big-span greeen anim translate-anim-2 position-12"></span>
            </div>
            {
                loader ? (
                    <>
                    </>
                ) : (
                    <>
                        {/* {
                            BlogList?.map((item) => ( */}
                        <div class="container">
                            

                            <div class="col-lg-12 col-md-12 col-sm-12 displayflex">

                                <div className="col-lg-8 col-md-8 col-sm-8">

                                    <h1>{blogData.title}</h1>

                                    <p><i className="fa fa-calendar"></i>{" "}{blogData.createtdDate.split("T")[0]}</p>
                                    <p> <i className="fa fa-eye" ></i> Views:{blogData.viewCount}</p>
                                    <img style={{width:"300px",height:"300px"}} src={"https://api.fineoriginal.com/" + blogData.image} alt="banner" />
                              
                                </div>
                                                      
                                <div className="col-lg-4 col-md-12 col-sm-12 paddingTop1">
                                    {/* <div className="side-pnl">
                                        <h3>Categories</h3>
                                        <ul class="category-list" style={{color:"white"}}>
                                            {
                                                blogData.blogCategories.map((category) => {
                                                    return (<>
                                                        <li><a >{category.categoryName}{"     "}</a></li>
                                                    </>)
                                                })
                                            }

                                        </ul>
                                    </div> */}
                                    <div className="side-pnl">
                                        <h3>Tags</h3>
                                        <ul class="category-list" style={{color:"white"}}>
                                            {
                                                blogData.blogTags.map((category) => {
                                                    return (<>
                                                        <li><a >{category.name}{"     "}</a></li>
                                                    </>)
                                                })
                                            }

                                        </ul>
                                    </div>

                                </div>

                            </div>

                <div className="pt-5"></div>
                            <div className="spacer-single"></div>
                            <div class="row">
                                <div className="">
                                    <p>
                                        <div  className="ck-content > *, .ck-content span"  dangerouslySetInnerHTML={{ __html: description }}></div>
                                    </p>
                                </div>
                              
                            </div>
                        </div>
                    </>)
            }

        </section>
        </SharedLayout>
    </>)
};
export default BlogDetail;
