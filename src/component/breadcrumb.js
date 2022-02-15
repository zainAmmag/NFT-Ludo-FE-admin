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
            <Breadcrumbs maxItems={2} aria-label="breadcrumb" style={{paddingTop:"3%",color:"white"}}>
                <Link to="/ProjectManagement">
                <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}>Admin Panal</p>
                </Link>
                {window.location.pathname === '/ProjectManagement' && (
                    <Link to="/ProjectManagement" className="waves-effect">
                        <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}>Project Management</p>
                    </Link>
                )}
                {
                    window.location.pathname === '/manageAccount' && (
                        <Link to="/manageAccount" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}>Manage Account</p>
                        </Link>
                    )
                }
                {
                    window.location.pathname === '/orderDetail' && (
                        <Link to="/orderDetail" className="waves-effect">
                            <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}>Manage Orders</p>
                        </Link>
                    )
                }
                {
                    window.location.pathname === "/manageCollection" && (
                        <Link to="/manageCollection" className="waves-effect">
                        <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}>Manage Collection</p>
                    </Link>
                    )
               
                }
                {
                         window.location.pathname === '/CreateCollection' && (
                            <Link to="/CreateCollection"  className="waves-effect"  > 
                            <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}><Link to="/manageCollection">  Manage Collection</Link> / CreateCollection</p>
                             </Link>
                        )
                }
                {
                    window.location.pathname === "/createNFT" && (
                        <Link to="/createNFT" className="waves-effect">
                    <p className="LINK_OVERVIEW" style={{fontSize:"15px"}}>Create NFT</p>
                </Link>
                    )
                }
            </Breadcrumbs>
        </div>
    );
}
