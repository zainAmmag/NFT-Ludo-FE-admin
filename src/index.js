import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Assets/css/custom.css";
import "font-awesome/css/font-awesome.min.css";
import "../src/Assets/css/new.css";
import SignIn from "./component/SignIn";

import SignIn1 from "./component/SignIn";
import SharedLayout from "./component/shared/SharedLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Loader from "./component/shared/loader";
import ProjectManagement from "./component/ProjectManagement";
import MenageAccount from './component/MenageAccount'
import UserDetail from "./component/UserDetail";
import ManagerOrder from './component/MenageOrder'
import OrderDetail from "./component/OrderDetail";
import ManageCollection from "./component/ManageCollection";
import CreateNFT from "./component/createNFT";
import NFTDetail from "./component/NFTDetail";
import NFTDetail1 from "./component/NFTDetail";
import NFTDetail2 from "./component/NFTDetail";
import ShowCollectionDetail from './component/ShowCollectionDetail'
import ShowCollectionDetail1 from './component/ShowCollectionDetail'
import CreateCollection from "./component/CreateCollection1"
import EditCollection from "./component/EditCollection";
import ManageNFt from "./component/ManageNFT"
import UpdateNFt from "./component/UpdateNFt";
import OrderStatus from "./component/OrderStatus";
const Pages = () => {

  return (
    <Loader
      style={{
        flex: 1,
      }}
    >
      <BrowserRouter basename={"/"}>
        <div>
          <Switch>
            <PublicRoute restricted={true} exact path="/SignIn" component={SignIn} />{" "}


            {/* <Route path="*">
        
        </Route> */}

{/* <Route  component={SignIn}/> */}

{/* <PrivateRoute
                  exact
                  path="/manageAccount"
                  component={MenageAccount}
                ></PrivateRoute>{" "} */}



            <Fragment>
              <SharedLayout>                <PrivateRoute
                  exact
                  path="/manageAccount"
                  component={MenageAccount}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/userDetail"
                  component={UserDetail}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/orderDetail"
                  component={OrderDetail}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/managerOrder"
                  component={ManagerOrder}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/ManageNFt"
                  component={ManageNFt}
                ></PrivateRoute>{" "}


                <PrivateRoute
                  exact
                  path="/UpdateNFt"
                  component={UpdateNFt}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/nftdetail"
                  component={NFTDetail}
                ></PrivateRoute>{" "}
                <PrivateRoute
                  exact
                  path="/nftdetail1"
                  component={NFTDetail2}
                ></PrivateRoute>{" "}
                <PrivateRoute
                  exact
                  path="/nftdetail2"
                  component={NFTDetail1}
                ></PrivateRoute>{" "}


                <PrivateRoute
                  exact
                  path="/createNFT"
                  component={CreateNFT}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/manageCollection"
                  component={ManageCollection}
                ></PrivateRoute>{" "}
                <PrivateRoute
                  exact
                  path="/ShowCollectionDetail"
                  component={ShowCollectionDetail}
                ></PrivateRoute>{" "}
                 <PrivateRoute
                  exact
                  path="/ShowCollectionDetail1"
                  component={ShowCollectionDetail1}
                ></PrivateRoute>{" "}
                <PrivateRoute
                  exact
                  path="/EditCollection"
                  component={EditCollection}
                ></PrivateRoute>{" "}
                <PrivateRoute
                  exact
                  path="/CreateCollection"
                  component={CreateCollection}
                ></PrivateRoute>{" "}

                <PrivateRoute
                  exact
                  path="/orderstatus"
                  component={OrderStatus}
                ></PrivateRoute>{" "}
            </SharedLayout>

            </Fragment>{" "}
          </Switch>{" "}
        </div>{" "}
      </BrowserRouter>{" "}
    </Loader>
  );
};
ReactDOM.render(
  <Provider store={store}>
    <Pages />
  </Provider>,
  document.getElementById("root")
);
