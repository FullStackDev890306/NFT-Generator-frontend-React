import React from "react";
import ReactDom from "react-dom";
import {
  Button,
  Input,
  FormGroup,
  Alert,
  Row,
  Col,
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";

export default function PaymentPage() {

    const getLocalStorage = (key) => {
        let app_state = JSON.parse(localStorage.getItem('app-state'));
        switch(key)
        {
          case "rarity_modal":
            if(app_state)
              return app_state["rarity_modal"];
            else
              return false;
          case "new_layer_name":
            if(app_state)
              return app_state["new_layer_name"];
            else
              return null;
          case "layers":
            if(app_state)
              return app_state["layers"];
            else
              return [{
                layer_name:"Background",
                image_cnt: 0,
                image_collection_cnt : 0,
                image_dimension : [0,0],
                image_file: [],
                image_info: [],
                per: 100,
              }];
          case "selected_layer":
            if(app_state)
              return app_state["selected_layer"];
            else
              return 0;
          case "selected_image":
            if(app_state)
              return app_state["selected_image"];
            else
              return -1;
          case "show_randomize":
            if(app_state)
              return app_state["show_randomize"];
            else
              return "hide";
          case "show_panel_wrapper":
            if(app_state)
              return app_state["show_panel_wrapper"];
            else
              return -1;
          case "disable_btn":
            if(app_state)
              return app_state["disable_btn"];
            else
              return true;
          default:
            return null;
        }
      }
    const [layers, setLayers] = React.useState(getLocalStorage("layers"));

    const displayCheckLayers = () => {
        var element = [];
        for(var i = 0; i < layers.length; i ++)
        {
            var image_element = [];
            for(var j = 0; j < layers[i].image_cnt; j ++)
                image_element.push(
                    <li key={j}>
                        <span>{layers[i].image_info[j].image_name}</span>
                        <span>{layers[i].image_info[j].image_collection + "/" + layers[i].image_collection_cnt}</span>
                    </li>
                )
            element.push(
                <li className="check_layers_list" key={i}>
                    <span>{layers[i].layer_name}</span>
                    <ul>
                        {image_element}
                    </ul>
                </li>
            )
        }
        ReactDom.render(element, document.getElementById("check_layers"));
    }
    React.useEffect(() => {  
        displayCheckLayers();
        document.body.classList.toggle("payment-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
        document.body.classList.toggle("payment-page");
        };
    },[]);
    //////////////---------------------------------///////////////
  
  
    /////////////----------return component-------//////////////////
    return (
      <>
        <div className="wrapper pay-page">
            <section className="section section-lg">
                <Row>
                    <div className="column pay-left-side">
                        <Button className="btn-neutral payment-back-btn" href="./app">Back</Button>
                        <h3 className="layer-heading">Layers</h3>
                        <p className="layer-heading-tip"><i>The number on each row represents the sum of items that will be generated.</i></p>
                        <div className="check_layers">
                            <ul id="check_layers">
                                
                            </ul>
                        </div>
                    </div>
                    <div className="column pay-right-side">
                        <h1 className="purchase-header">Purchase</h1>
                        <form className="purchase-form">
                            <div className="form-part">
                                <FormGroup>
                                   <Input type="text" placeholder="Name"/>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <Input type="text" placeholder="Email" />
                                        </Col>
                                        <Col>
                                            <Input type="text" placeholder="Phone" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <Input type="text" placeholder="Promo Code" />
                                        </Col>
                                        <Col>
                                            <Button>APPLY</Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                            <div className="form-part">
                                <FormGroup>
                                    <Input type="text" placeholder="1234 1234 1234 1234" />
                                </FormGroup>
                                <div className="form-row">
                                    <FormGroup className="col-md-4">
                                        <Input type="text" placeholder="MM/YY" />
                                    </FormGroup>
                                    <FormGroup className="col-md-4">
                                        <Input type="text" placeholder="CVC" />
                                    </FormGroup>
                                    <FormGroup className="col-md-4">
                                        <Input type="text" placeholder="94107(Zip/Postal Code)" />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="form-part">
                                <Alert color="info" className="myalert">Once you click `Pay`, your card will be charged and we will start generating your collection. You will not be able to modify it after this step.</Alert>
                            </div>
                            <div className="form-part">
                                <div className="form-row">
                                    <FormGroup className="col-md-6">
                                        <Button color="success" className="form-submit-btn">PAY $179.00</Button>
                                    </FormGroup>
                                    <FormGroup className="col-md-6">
                                    <   Button color="info" className="form-submit-btn">PAY 0.059 ETHER (NOT CONNECTED)</Button>
                                    </FormGroup>
                                </div>
                            </div>
                        </form>
                    </div>
                </Row>
            </section>
            <Footer />
        </div>
      </>
    );
    /////////////-----------------//////////////////
  
  }
  