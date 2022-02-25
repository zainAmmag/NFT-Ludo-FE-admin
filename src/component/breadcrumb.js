import * as React from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function CollapsedBreadcrumbs() {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb" style={{ paddingTop: "30px", color: "white" }}>
                <Link to="/ProjectManagement">
                    <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Admin Panel</p>
                </Link>
                {window.location.pathname === '/ProjectManagement' && (
                    <Link to="/ProjectManagement" className="waves-effect">
                        <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Project Management</p>
                    </Link>
                )}
                {
                    window.location.pathname === '/manageAccount' && (
                        <Link to="/manageAccount" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Manage Account</p>
                        </Link>
                    )
                }

                {
                    window.location.pathname === '/userDetail' && (
                        <Link to="/userDetail" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}><Link to="/manageAccount"> Manage Account </Link> / User Detail</p>
                        </Link>
                    )
                }


                {
                    window.location.pathname === '/nftdetail' && (
                        <Link to="/nftdetail" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}><Link to="/manageAccount"> Manage Account </Link> /<Link to="/userDetail">  User Detail </Link> / Nft Detail</p>
                        </Link>
                    )
                }



                {
                    window.location.pathname === '/orderDetail' && (
                        <Link to="/orderDetail" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Manage Orders</p>
                        </Link>
                    )
                }

                {
                    window.location.pathname === '/orderstatus' && (
                        <Link to="/orderstatus" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}><Link to="/orderDetail"> Manage Orders </Link> / Order Status</p>
                        </Link>
                    )
                }

                {
                    window.location.pathname === "/manageCollection" && (
                        <Link to="/manageCollection" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Manage Collection</p>
                        </Link>
                    )

                }
                {
                    window.location.pathname === '/CreateCollection' && (
                        <Link to="/CreateCollection" className="waves-effect"  >
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}><Link to="/manageCollection">  Manage Collection</Link> / CreateCollection</p>
                        </Link>
                    )
                }
                   {
                    window.location.pathname === '/ShowCollectionDetail' && (
                        <Link to="/ShowCollectionDetail" className="waves-effect"  >
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}><Link to="/manageCollection">  Manage Collection</Link> / Collection Detail</p>
                        </Link>
                    )
                }

                {
                    window.location.pathname === "/createNFT" && (
                        <Link to="/createNFT" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Create NFT</p>
                        </Link>
                    )
                }


                {
                    window.location.pathname === '/ManageNFt' && (
                        <Link to="/ManageNFt" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}>Manage NFt</p>
                        </Link>
                    )
                }

{/* {
                    window.location.pathname === '/nftdetail' && (
                        <Link to="/nftdetail" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{ fontSize: "15px" }}><Link to="/ManageNFt">  Manage NFt</Link> / Nft Detail</p>
                        </Link>
                    )
                } */}
            </Breadcrumbs>
        </div>
    );
}
