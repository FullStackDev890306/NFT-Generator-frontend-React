import React from "react";
import ReactDom from "react-dom";
import {
  Button,
  Input,
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem, 
  UncontrolledButtonDropdown,
  Modal,
  Form,
  UncontrolledTooltip ,
  Row,
  Col,
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// core components
import Footer from "components/Footer/Footer.js";


export default function AppPage() {
  
  //////////////-------state variables-------------///////////////
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
  const [rarity_modal, RaritySettingModal] = React.useState(getLocalStorage("rarity_modal"));//opening Modal
  const [new_layer_name, setNewLayerName] = React.useState(getLocalStorage("new_layer_name"));//new Layer name
  const [layers, setLayers] = React.useState(getLocalStorage("layers"));//new Layer name
  const [selected_layer, setSelectedLayer] = React.useState(getLocalStorage("selected_layer"));//select layer
  const [selected_image, setSelectedImage] = React.useState(getLocalStorage("selected_image"));//select image
  const [show_randomize, setShowRandomize] = React.useState(getLocalStorage("show_randomize"));//show randomize
  const [show_panel_wrapper, setShowPanelWrapper] = React.useState(getLocalStorage("show_panel_wrapper"));
  const [disable_btn, setDisableBtn] = React.useState(getLocalStorage("disable_btn"));//disable button
  //////////////---------------------------------///////////////


  //////////////-------ref variables-------------///////////////
  const drop_image = React.useRef(null);//drop Images
  //////////////---------------------------------///////////////


  //////////////-------functions-------------///////////////

  const refereshProjectSetting = () => {
    setNewLayerName("");
    setLayers([{
      layer_name:"Background",
      image_cnt: 0,
      image_collection_cnt : 0,
      image_dimension : [0,0],
      image_file: [],
      image_info: [],
      per: 100,
    }]);
    setSelectedLayer(0);
    setSelectedImage(-1);
    setShowRandomize("hide");
    setDisableBtn(true);
    setShowPanelWrapper(-1);

    document.getElementById("new_laer_input").value = "";
    document.getElementById("image_dimension_x").value = 0;
    document.getElementById("image_dimension_y").value = 0;
  }

  const delSelectedLayer = () => {
    if(layers.length === 1 )
      return;
    setLayers(layers.filter((item, index) => index !== selected_layer));
    setSelectedLayer(0);
  }

  const addNewLayer = () => {
    if(new_layer_name === null)
      return;
    var tmp_layers = [...layers];
    for(var i = 0; i < tmp_layers.length; i ++)
      if(new_layer_name === tmp_layers[i].layer_name)
        return;
    tmp_layers.push({
      layer_name : new_layer_name,
      image_cnt: 0,
      image_collection_cnt:0,
      image_dimension : [0,0],
      image_file: [],
      image_info:[],
      per: 100,
    })
    setLayers(tmp_layers)
    setSelectedLayer(tmp_layers.length-1);
    document.getElementById("new_laer_input").value = "";
  }

  const clickLayer = (layer_id) => {
    var id = parseInt(layer_id.substr(6));
    setSelectedLayer(id);
  }

  const clickImage = (image_id) => {
    if(show_randomize === "hide")
      {
        setSelectedImage(parseInt(image_id.substr(6)));
        setShowPanelWrapper(-1);
      }
    else
    {
      setShowPanelWrapper(parseInt(image_id.substr(6)));
    }
  }

  const delImage = (image_id) => {
    setSelectedImage(-1);
    var tmp_layers = [...layers];
    tmp_layers[selected_layer].image_cnt --;
    tmp_layers[selected_layer].image_collection_cnt -= tmp_layers[selected_layer].image_info[image_id].image_collection;
    tmp_layers[selected_layer].image_file.splice(image_id, 1);
    tmp_layers[selected_layer].image_info.splice(image_id, 1);
    setLayers(tmp_layers);
  }

  const changeCurrentLayerName = (change_layer_name) => {
    var tmp_layers = [...layers];
    tmp_layers[selected_layer].layer_name = change_layer_name;
    setLayers(tmp_layers);
  }

  const setChangeLayerPer = (change_per) => {
    var tmp_layers = [...layers];
    tmp_layers[selected_layer].per = change_per;
    setLayers(tmp_layers);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(layers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedLayer(result.destination.index);
    setLayers(items);
  }

  const displayLayers = () => {
    var layers_element = (
    <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="layers_element">
            {(provided) => (
              <ul className="layers-element" {...provided.droppableProps} ref={provided.innerRef}>
                {layers.map(({layer_name, image_cnt, per}, index) => {
                  return (
                    <Draggable key={layer_name} draggableId={layer_name} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={"layer card menu " + (selected_layer === index  ? "active" : "")} key={index} id={"layer_" + index} value={index} onClick={(e) => clickLayer(e.currentTarget.id)}>
                          <span className="item items">
                            <span className="item">{layer_name}</span>
                            <span className="item">
                              <span title="File Count" className="item count">{image_cnt}</span>
                              <span title="Layer rarity" className="item count">{per + "%"}</span>
                            </span>
                          </span>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    )

    ReactDom.render(layers_element,document.getElementById("layers"));
  }

  const displayImagesForLayer = () => {
    if(layers[selected_layer].image_cnt === 0)
    {
        var tmp = [];
        ReactDom.render(tmp,document.getElementById("image-board"));
        return;
    }
    var i = 0;
    var images_for_layer_element = [];
    for(i = 0; i < layers[selected_layer].image_cnt; i ++)
    {
      images_for_layer_element.push((
        <div key={i}>
          <div className={"image-panel " + (layers[selected_layer].image_info[i].image_valid !== 1? "invalid ":"") + (selected_image === i ? "active" : "")} id={"image_" + i} onClick={(e) => clickImage(e.currentTarget.id)}>
            <img alt="" loading="lazy" decoding="async" src={layers[selected_layer].image_info[i].image_url} className="image-card" />
            <span className="per-tag">{(layers[selected_layer].image_info[i].image_collection * 100 / layers[selected_layer].image_collection_cnt).toFixed(1) + "%"}</span>
            <span className="name-tag">{layers[selected_layer].image_info[i].image_name}</span>
            {(selected_image === i ?
            <Button className="delete project-btn image-card-btn" id={i} onClick={(e) => delImage(e.currentTarget.id)}>
              <i className="tim-icons icon-simple-remove" />
            </Button>:""
            )}
          </div>
          {(layers[selected_layer].image_info[i].image_valid !== 1?
          <UncontrolledTooltip placement="top" target={"image_" + i} delay={0}>
            This file does not respect the project dimensions. Expected {layers[selected_layer].image_dimension[0]} * {layers[selected_layer].image_dimension[1]} but this is {layers[selected_layer].image_info[i].dimension_x} * {layers[selected_layer].image_info[i].dimension_y}.Please remove it.
          </UncontrolledTooltip>:""
          )}
        </div>
      ));
    }
   ReactDom.render(images_for_layer_element,document.getElementById("image-board"));
  }

  const displayButton = () => {
    var element = [];
    if(disable_btn)
    {
      element.push(
        (
        <div className="actions buttons" key={0}>
          <div className="button-section">
              <Button className="btn-neutral preview_btn" disabled >Preview</Button>
          </div>
          <div className="button-section">
            <UncontrolledButtonDropdown>
                <Button id="caret" className="btn-neutral generate_btn" color="info" disabled>Generate Collection</Button>
                <DropdownToggle caret className="dropdown-toggle-split btn-neutral" color="info" data-toggle="dropdown" disabled/>
                <DropdownMenu>
                    <DropdownItem header>Collection Size</DropdownItem>
                    <DropdownItem >100 Generate Art</DropdownItem>
                    <DropdownItem >1000 Generate Art</DropdownItem>
                    <DropdownItem >5000 Generate Art</DropdownItem>
                    <DropdownItem >10000 Generate Art</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem >My collection is smaller or equal to 100</DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      ));
    }
    else{
      element.push(
        (
        <div className="actions buttons" key={1}>
          <div className="button-section">
              <Button className="btn-neutral preview_btn" >Preview</Button>
          </div>
          <div className="button-section">
            <UncontrolledButtonDropdown>
                <Button id="caret" className="btn-neutral generate_btn" color="info" href="/payment">Generate Collection</Button>
                <DropdownToggle caret className="dropdown-toggle-split btn-neutral" color="info" data-toggle="dropdown"/>
                <DropdownMenu>
                    <DropdownItem header>Collection Size</DropdownItem>
                    <DropdownItem >100 Generate Art</DropdownItem>
                    <DropdownItem >1000 Generate Art</DropdownItem>
                    <DropdownItem >5000 Generate Art</DropdownItem>
                    <DropdownItem >10000 Generate Art</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem >My collection is smaller or equal to 100</DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      ));
    }
    ReactDom.render(element, document.getElementById('action_button'))
  }

  const displayImageRarity = () => {
    var is_modal = document.getElementById("image-rarity-assets");
    if(is_modal === null)
      return;
    if(layers[selected_layer].image_cnt === 0)
    {
        var tmp = [];
        ReactDom.render(tmp,document.getElementById("image-rarity-assets"));
        return;
    }
    else
    {
      var i = 0;
      var images_for_layer_element = [];
      for(i = 0; i < layers[selected_layer].image_cnt; i ++)
      {
        images_for_layer_element.push(
          <div className="assets-panel" key={i}>
            <figure className="is-1">
              <img alt="" src={layers[selected_layer].image_info[i].image_url} className="assets_img" />
            </figure>
            <div className="is-2">
            {(layers[selected_layer].image_info[i].image_collection * 100 / layers[selected_layer].image_collection_cnt).toFixed(2) + "%"}
            </div>
            <div className="is-3">
            {layers[selected_layer].image_info[i].image_name}
            </div>
            <div className="is-6">
              <Input className="rarity_image_input" id={"image_rarity_"+i} type="number" min="0" max="10000" value={layers[selected_layer].image_info[i].image_collection} onChange={e => setImageRarity(e.target.value, e.currentTarget.id)}/>
              <span>out of {layers[selected_layer].image_collection_cnt} </span>
            </div>
          </div>
        );
      }
      ReactDom.render(images_for_layer_element,document.getElementById("image-rarity-assets"));
    }
  }

  const displayWrapperPanel = () => {
    if(show_panel_wrapper === -1 || show_randomize === "hide")
    {
      var non_element = (<div></div>)
      ReactDom.render(non_element, document.getElementById("image_wrapper_panel"));
      return;
    }
    var element = (
      <div className="panel_wrapper">
        <div className="panel_wrapper_body">
          <i className="tim-icons icon-simple-remove panel_wrapper_close" onClick={removeShowPanelWrapper}/>
          <div className="image-panel-wrapper">
            <img alt="" src={layers[selected_layer].image_info[show_panel_wrapper].image_url}/>
          </div>
          <h4>Attributes:</h4>
          <table className="panel_wrapper_table">
            
          </table>
        </div>
      </div>
    )
    ReactDom.render(element, document.getElementById("image_wrapper_panel"));
  }

  const removeShowPanelWrapper = () => {
    setShowPanelWrapper(-1);
  }
  
  const setImageRarity = (value, rarity_id) =>{
    var tmp_layers = [...layers];
    var id = parseInt(rarity_id.substr(13));
    value = parseInt(value);
    tmp_layers[selected_layer].image_collection_cnt -= tmp_layers[selected_layer].image_info[id].image_collection;
    tmp_layers[selected_layer].image_info[id].image_collection = value;
    tmp_layers[selected_layer].image_collection_cnt += value;
    setLayers(tmp_layers);
  }

  const changeShowRandomize = () => {
    var t = show_randomize === "hide" ? "show" : "hide";
    setSelectedImage(-1);
    setShowPanelWrapper(-1);
    setShowRandomize(t);
  }

  const fileDropPanel = () => {
    drop_image.current.click();
  }

  const onChangeDropImage = (event) => {
    if(event.target.files.length === 0)
      return;
    for(var i = 0; i < event.target.files.length; i ++)
    {
      var tmp_layers = [...layers];
      var img_cnt = tmp_layers[selected_layer].image_cnt;
      tmp_layers[selected_layer].image_collection_cnt += 50;
      tmp_layers[selected_layer].image_info.push({
        image_name : event.target.files[0].name.substr(0,event.target.files[0].name.length - 4),
        image_url : URL.createObjectURL(event.target.files[0]),
        image_collection : 50,
        image_valid: 1,
      });
      tmp_layers[selected_layer].image_file.push(event.target.files[0]);
      tmp_layers[selected_layer].image_cnt = img_cnt + 1;
      setLayers(tmp_layers);

      var reader = new FileReader();
      
      const img = new Image();
      reader.onload = (event) => {
        img.src = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      img.onload = () => {
          var tmp_layers = [...layers];
          if(tmp_layers[selected_layer].image_cnt === 1)
          {
            tmp_layers[selected_layer].image_dimension[0] = img.width;
            tmp_layers[selected_layer].image_dimension[1] = img.height;
          }
          if(!(tmp_layers[selected_layer].image_dimension[0] === img.width && tmp_layers[selected_layer].image_dimension[1] === img.height))
            tmp_layers[selected_layer].image_info[tmp_layers[selected_layer].image_cnt - 1].image_valid = 0;
          else
            tmp_layers[selected_layer].image_info[tmp_layers[selected_layer].image_cnt - 1].image_valid = 1;
          tmp_layers[selected_layer].image_info[tmp_layers[selected_layer].image_cnt - 1].dimension_x = img.width;
          tmp_layers[selected_layer].image_info[tmp_layers[selected_layer].image_cnt - 1].dimension_y = img.height;
          setLayers(tmp_layers);
      }
    }
  }
  //////////////---------------------------------///////////////


   //////////////-------react hook-------------///////////////
   React.useEffect(() => {

    const app_state = {
      rarity_modal : rarity_modal,
      new_layer_name : new_layer_name,
      layers : layers,
      selected_layer : selected_layer,
      selected_image : selected_image,
      show_randomize : show_randomize,
      show_panel_wrapper : show_panel_wrapper,
      disable_btn : disable_btn,  
    }
    localStorage.setItem('app-state', JSON.stringify(app_state))


     if(layers.length > 1)
     {
      var sum = 0;
      for(var i = 0; i < layers.length; i ++)
        sum += layers[i].image_cnt;
      if(sum > 0)
        setDisableBtn(false);
     }
    displayLayers();
    displayImagesForLayer();
    displayImageRarity();
    displayButton();
    displayWrapperPanel();
    document.body.classList.toggle("app-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("app-page");
    };
  },[layers, selected_layer, selected_image,disable_btn,show_panel_wrapper,show_randomize]);
  //////////////---------------------------------///////////////


  /////////////----------return component-------//////////////////
  return (
    <>
      <div className="wrapper">
        <section className="section section-lg">
            <Row>
              <div className="column left-side">
                <h2>Layers</h2>
                <div id="layers">

                </div>
                <div className="layer card">
                  <div className="item items">
                    <Input type="text" placeholder="New Layer" id="new_laer_input" min="3" required className="new_layer layer_input" onChange={e => setNewLayerName(e.target.value)}/>
                    <Button className="new_layer delete layer_add"  onClick={addNewLayer}>+</Button>
                  </div>
                </div>
                <div className="sep"></div>
                <div id="action_button">

                </div>
              </div>
              <div className="column central-side">
                <div className="central-header">
                  <div className="left-header-part">
                    <div className="modify-card">
                      <div className="project-title modify-info">
                        Layer:{layers[selected_layer].layer_name}
                      </div>
                    </div>
                    <div className="modify-card">
                      <div className="project-title modify-info">
                      {layers[selected_layer].image_cnt} image(s)
                      </div>
                    </div>
                  </div>
                  <div className="right-header-part">
                  <div className="modify-card gallery-btn">
                    <Button className="btn_top btn-simple" size="sm" onClick={() => changeShowRandomize()}>
                      <i className="tim-icons icon-compass-05" />
                      Gallery
                    </Button>
                    <Button className={"btn_top btn-simple " + show_randomize} size="sm">
                      <i className="tim-icons icon-coins" />
                      Randomize
                    </Button>
                </div>
                  </div>
                </div>
                <div className="image-board" id="image-board">
                  
                </div>
                <div className="drop">
                  <div className="file-drop-target" onClick={fileDropPanel}>
                    Click or drop images here!
                    <br />
                    <i>(image/png, image/gif, video/mp4, Max size: 10MB)</i>
                    <input id="drop_image" className="drop_files" multiple type="file" accept=".png, .gif, .m4v, .mp4" ref={drop_image} onChange={onChangeDropImage.bind(this)} />
                  </div>
                </div>
              </div>
              
              <div id = "image_wrapper_panel">

              </div>

              <div className="column right-side">
                <div className="install-metamask">
                  <Button className="btn_top btn-simple" size="sm">
                    <i className="tim-icons icon-key-25" />
                    Install Metamask to login
                  </Button>
                </div>
                <Form className="project-setting">
                  <div className="project-header">
                    <div className="project-title">
                      Project Setting
                      <Button className="delete project-btn" onClick={() =>  { if (window.confirm('Are you sure you wish to Save the details ?')) refereshProjectSetting() }  }>
                        <i className="tim-icons icon-refresh-01" />
                      </Button>
                    </div>
                  </div>
                  <div className="project-field">
                    <label>Project Name</label>
                    <Input type="text" defaultValue="No Name" />
                  </div>
                  <div className="project-field">
                    <label>Project Description</label>
                    <Input type="text" defaultValue="" />
                  </div>
                  <div className="project-field">
                    <label>Collection Size </label> <i className="tim-icons icon-alert-circle-exc" id="tooltip-1"/>
                    <UncontrolledTooltip placement="top" target="tooltip-1" delay={0}>
                        The number of itmes to generate(up to 10,000).
                    </UncontrolledTooltip>
                    <Input type="number" defaultValue="5" min="5" max="15000" step="50"/>
                  </div>
                  <div className="project-field">
                    <label>Dimension </label> <i className="tim-icons icon-alert-circle-exc" id="tooltip-2"/>
                    <UncontrolledTooltip placement="top" target="tooltip-2" delay={0}>
                        The image resolution are picked from first image you drag and drop.We expect all images to be the same resolution.
                    </UncontrolledTooltip>
                    <div className="project-field half">
                      <Col>
                        <Input type="number" value={layers[selected_layer].image_dimension[0]} id="image_dimension_x" min="100" max="3000" readOnly />
                      </Col>
                      <Col>
                        <Input type="number" value={layers[selected_layer].image_dimension[1]} id="image_dimension_y" min="100" max="3000" readOnly />
                      </Col>
                    </div>
                  </div>
                  <div className="project-field">
                    <UncontrolledDropdown group className="fwidth" direction="up">
                    <DropdownToggle caret color="simple btn-white" data-toggle="dropdown" className="export_webp" >
                      <i className="tim-icons icon-image-02" /> Export to: webp
                    </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem text>WebP is the recommended image format because of it`s excellent compression and image quality.</DropdownItem>
                          <DropdownItem>WebP</DropdownItem>
                          <DropdownItem divider/>
                          <DropdownItem text>Png is not recommended because of it`s poor compression resulting in very large image size</DropdownItem>
                          <DropdownItem>Png</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Form>
                <Form className="layer-setting">
                  <div className="project-header">
                    <div className="project-title">
                      Layer Setting
                      <Button className="delete project-btn" onClick={delSelectedLayer}>
                        <i className="tim-icons icon-simple-remove" />
                      </Button>
                    </div>
                  </div>
                  <div className="project-field">
                    <label>Layer Name</label>
                    <Input type="text" value={layers[selected_layer].layer_name} onChange={(e) => changeCurrentLayerName(e.target.value)}/>
                  </div>
                  <div className="project-field">
                    <Button className="btn-simple btn-white fwidth" onClick={() => RaritySettingModal(true)}>
                      <i className="tim-icons icon-app" /> Rarity Settings
                    </Button>
                    
                    <Modal
                      modalClassName="modal-black"
                      isOpen={rarity_modal}
                      toggle={() => RaritySettingModal(false)}
                      id = "settingModal"
                      // onOpened={createSlider}
                      onOpened={displayImageRarity}
                    >
                      <div className="modal-header justify-content-center">
                        <button className="close" onClick={() => RaritySettingModal(false)}>
                          <i className="tim-icons icon-simple-remove text-white" />
                        </button>
                        <div className="text-muted text-center ml-auto mr-auto">
                          <h4 className="mb-0">Settings</h4>
                       </div>
                      </div>
                      <div className="modal-body">
                      <h4 className="mb-0">Rarity Settings -<span>{layers[selected_layer].layer_name}</span> </h4>
                        <div className="rarity-panel">
                        <span className="rarity-input-span">1%</span>
                          <div className="rarity-input">
                            <Input className="rarity_input" type="number" min="0" max="100" value={layers[selected_layer].per} onChange={e => setChangeLayerPer(e.target.value)} />
                          </div>
                        <span className="rarity-input-span">100%</span>
                          {/* <div className="rarity-layer">
                            <span>1%</span>
                            <div className="slider rarity-layer-slider" id="layer_slider" ref={layer_slider} />
                            <span>100%</span>
                          </div> */}
                        </div>
                        <div className="assets-header">
                          <h4 className="mb-0">Assets-</h4>
                          {/* <CustomInput type="switch" id="switch-2" className="assets-switch"/> */}
                          <label className="inline-switch">Advanced:</label>
                        </div>
                        <div id="image-rarity-assets">

                        </div>
                      </div>
                    </Modal>
                  </div>

                </Form>
              </div>
            </Row>
        </section>
        <Footer />
      </div>
    </>
  );
  /////////////-----------------//////////////////

}
