import React, { Component } from "react";
import { RadioGroup, RadioButton, Button } from "react-radio-buttons";
import Dropzone from "react-dropzone";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { enableRipple } from "@syncfusion/ej2-base";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import logo from "./FanDownApp.png";
import "./App.css";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import axios from "axios";

//import vision from "react-cloud-vision-api";

const config = {
  apiKey: "AIzaSyDokdogvB3-xu5Nh7sYMcSTBBkn9Y7EStc",
  authDomain: "uploadimage-68fb7.firebaseapp.com",
  databaseURL: "https://uploadimage-68fb7.firebaseio.com",
  projectId: "uploadimage-68fb7",
  storageBucket: "gs://uploadimage-68fb7.appspot.com",
  messagingSenderId: "384012856840"
};
firebase.initializeApp(config);

var realData;

enableRipple(true);

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          id: 1,
          name: "Mitch Trubisky",
          total: 16.0,
          points: 5
        },
        {
          id: 2,
          total: 11.0,
          name: "Tarik Cohen",
          points: 10
        },
        {
          id: 3,
          total: 12.0,
          name: "Jordan Howard",
          points: 15
        },
        {
          id: 4,
          total: 13.0,
          name: "Allen Robinson",
          points: 20
        },
        {
          id: 5,
          total: 14.0,
          name: "Taylor Gabriel",
          points: 25
        }
      ],
      expandedRows: []
    };
    //this.state = { files: [] };
  }
  // state = {
  //   //username: "",
  //   //avatar: "",
  //   isUploading: false,
  //   progress: 0
  //   //avatarURL: ""
  // };
  componentDidMount() {
    // axios(
    //   "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
    // ).then(); //res => onLoad(res.data));
    console.log("hello");
    axios
      .get(
        "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
      )
      .then(function(response) {
        console.log("Is this running: " + JSON.stringify(response));
        realData = JSON.stringify(response);
      })
      .catch(function(error) {
        console.log("Is this: " + error);
      });
  }
  onDrop(files) {
    this.setState({
      files
    });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  // handleChangeUsername = event =>
  // this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error.error);
  };
  runThisShit = () => {
    axios
      .get(
        "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
      )
      .then(function(response) {
        console.log("Is this running: " + JSON.stringify(response));
      })
      .catch(function(error) {
        console.log("Is this: " + error);
      });
  };
  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
    //.then(url => this.setState({ avatarURL: url }));
  };
  //  <td>{item.status}</td>
  //  <td>{item.points}</td>

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id);
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.id}>
        <td>{item.name}</td>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr key={"row-expanded-" + item.id}>
          <td>{item.name}</td>
        </tr>
      );
    }

    return itemRows;
  }
  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  handleRadioClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id);
    const closeClickCallBack = () => this.handleRadioClick(item.id);
    const itemRows = [
      <tr key={"row-data-" + item.id}>
        <td>
          <RadioButtonComponent onClick={closeClickCallBack} name={item.id} />
        </td>
        <td>{item.name}</td>
        <td>
          <RadioButtonComponent onClick={clickCallback} name={item.id} />
        </td>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr key={"row-expanded-" + item.id}>
          <td>{item.points}</td>
        </tr>
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];
    axios
      .get(
        "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
      )
      .then(function(response) {
        console.log("Is this running: " + JSON.stringify(response));
        realData = JSON.stringify(response);
        realData.data.forEach(item => {
          const perItemRows = this.renderItem(item);
          allItemRows = allItemRows.concat(perItemRows);
        });
      })
      .catch(function(error) {
        console.log("Is this: " + error);
      });

    return <table>{allItemRows}</table>;
  }
  /*
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
          >
            <p>
              Drag and Drop your FanDuel/DraftKings screen shots, or click to
              upload.
            </p>
          </Dropzone>
          <FileUploader
            default
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          <Accordion>
            <AccordionItem>
              <AccordionItemTitle>
                <RadioButtonComponent
                  label="Mitchell Trubisky"
                  name="position"
                  labelPosition="Before"
                />

                <RadioButtonComponent
                  label=""
                  name="position"
                  labelPosition="Before"
                />
              </AccordionItemTitle>
              <AccordionItemBody>
                <p>Replace</p>
                <p>Leave Blank</p>
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <RadioButtonComponent
                  label="Tarik Cohen"
                  name="position"
                  labelPosition="Before"
                />
                <RadioButtonComponent
                  label=""
                  name="position"
                  labelPosition="Before"
                />
              </AccordionItemTitle>
              <AccordionItemBody>
                <p>Replace</p>
                <p>Leave Blank</p>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
          <p>Powered By:</p>
          <a
            className="App-link"
            href="https://fantasydown.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="hello" />
            <p>Fantasy Down</p>
          </a>
        </header>
      </div>
    );
  }
  */
}

export default App;
