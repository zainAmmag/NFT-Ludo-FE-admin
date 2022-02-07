 import React from "react";
import './OrderDetail.css';
// import { MapContainer } from "./GoogleMap";
// import GoogleMap from './GoogleMap'
// import googleMapReact from "google-map-react";


class OrderDetail extends React.Component {
    // static defaultProps = {
    //     center: {
    //         lat: 59.95,
    //         lng: 30.33
    //     },
    //     zoom: 11
    // };

    // createMapOptions(maps) {
    //     return {
    //         zoomControlOptions: {
    //             position: maps.ControlPosition.RIGHT_CENTER,
    //             style: maps.ZoomControlStyle.SMALL
    //         },
    //         mapTypeControlOptions: {    
    //             position: maps.ControlPosition.TOP_RIGHT
    //         },
    //         mapTypeControl: true
    //     };
    // }
    render() {
        return (
            <div>
                <div className="heading">
                    <h1>OrderTracking</h1>
                </div>

                <div>
                    <div className="container-fluide" >
                        <div className="mapContainer col-8">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27200.48836185969!2d74.34700550000001!3d31.549939249999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1643875020370!5m2!1sen!2s" width="100%" height="100%"></iframe>
                        </div>

                        <div style={{ height: 300 }} className="col-4">

                            <h3 style={{ textAlign: 'center' }}>Details</h3>

                            <table className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement" style={{ textAlign: "center" }}>
                                <thead>
                                    <tr style={{ color: "#fff" }}>
                                        <th>Collection</th>
                                        <th>NFT Name </th>
                                        <th>Delevery Date </th>
                                        <th>Time</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody style={{ color: "#fff" }}>
                                
                                           
                                                    <tr>
                                                        <td>Music</td>
                                                        <td> Piano </td>
                                                        <td> 12/3/2022 </td>
                                                        <td>Tomorrow</td>
                                                        <td> Delever </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sports</td>
                                                        <td> BatKit </td>
                                                        <td> 12/3/2022 </td>
                                                        <td>5hours ago</td>
                                                        <td> Pending </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Business</td>
                                                        <td> Computer </td>
                                                        <td> 12/3/2022 </td>
                                                        <td>Today</td>
                                                        <td> OnWay </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Music</td>
                                                        <td> Gitaar </td>
                                                        <td> 12/3/2022 </td>
                                                        <td>2hours ago</td>
                                                        <td> Pending </td>
                                                    </tr>
                                        
                                            
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderDetail;