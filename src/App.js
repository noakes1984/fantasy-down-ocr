import React, { Component, button } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Dropzone from "react-dropzone";
import FormData from "form-data";

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
import axios, { post } from "axios";
import branch from "branch-sdk";
import request from "superagent";
import DropzoneComponent from "react-dropzone-component";

import FacebookLogin from "react-facebook-login";
import { FacebookProvider, LoginButton, Status } from "react-facebook";

//import vision from "react-cloud-vision-api";

var config = {
  apiKey: "AIzaSyBhuG9aWqOPeli7gKjMLi4Hw-9H12ILfFo",
  authDomain: "fantasydownfinal.firebaseapp.com",
  databaseURL: "https://fantasydownfinal.firebaseio.com",
  projectId: "fantasydownfinal",
  storageBucket: "fantasydownfinal.appspot.com",
  messagingSenderId: "381147026500"
};
firebase.initializeApp(config);

var realData;

enableRipple(true);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // persons: [
      //   "C. Paul",
      //   "J. Harden",
      //   "N. Batum",
      //   "L. Nance",
      //   "C. Capela",
      //   "M. Morris",
      //   "P. Millsap",
      //   "A. Len"
      // ],
      // persons: [
      //   {
      //     id: 1,
      //     name: "Mitch Trubisky",
      //     total: 16.0,
      //     points: 5
      //   },
      //   {
      //     id: 2,
      //     total: 11.0,
      //     name: "Tarik Cohen",
      //     points: 10
      //   },
      //   {
      //     id: 3,
      //     total: 12.0,
      //     name: "Jordan Howard",
      //     points: 15
      //   },
      //   {
      //     id: 4,
      //     total: 13.0,
      //     name: "Allen Robinson",
      //     points: 20
      //   },
      //   {
      //     id: 5,
      //     total: 14.0,
      //     name: "Taylor Gabriel",
      //     points: 25
      //   }
      // ],
      //username: "",
      //avatar: "",
      //isUploading: false,
      //progress: 0,
      // avatarURL: ""
      persons: [],
      expandedRows: [],
      selectedFile: null,
      id: "",
      //files: [],
      imageURL: "",
      uploadStatus: false,
      username: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      myURL: null,
      facebookURL: ""
    };
    //this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);

    //this.state = { files: [] };
    //this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidUpdate() {
    //this.responseFacebook();
    //console.log("State: " + this.state.myURL);
    //var self = this;
    // this.runThisShit();
    // axios
    //   .post(
    //     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/23",
    //     {
    //       file:
    //         "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628469.png"
    //     }
    //   )
    //   .then(function(response) {
    //     self.setState({ persons: response.data }, () => {
    //       //self.runThisShit();
    //     });
    //     //        console.log("Is this running: " + JSON.stringify(response));
    //   })
    //   .catch(function(error) {
    //     //console.log("Component Did Mount: " + error);
    //   });
    //console.log("This Branch: " + branch.link);
    //console.log("Branch SDK: " + JSON.stringify(thisBranch));
    //
    // const script = document.createElement("script");
    //
    // script.src = "https://cdn.branch.io/branch-latest.min.js";
    // script.async = true;
    //
    // document.body.appendChild(script);
  }
  // componentDidMount() {
  //   // axios(
  //   //   "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
  //   // ).then(); //res => onLoad(res.data));
  //   // const image = __dirname + "/../src/lineup25.jpg";
  //
  //   var self = this;
  //   axios.get(
  //     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
  //   ),
  //     {}
  //       .then(function(response) {
  //         console.log("Is this running: " + JSON.stringify(response.data));
  //         //realData = JSON.stringify(response);
  //         self.setState({ persons: response.data });
  //       })
  //       .catch(function(error) {
  //         console.log("Is this: " + error);
  //       });
  // }
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

  // handleUploadImage(ev) {
  //   ev.preventDefault();
  //
  //   const data = new FormData();
  //   data.append("file", this.uploadInput.files[0]);
  //   data.append("filename", this.fileName.value);
  //
  //   fetch(
  //     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/upload",
  //     {
  //       method: "POST",
  //       body: data
  //     }
  //   ).then(response => {
  //     response.json().then(body => {
  //       this.setState({
  //         imageURL: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628469.png${
  //           body.file
  //         }`
  //       });
  //     });
  //   });
  // }

  runThisShit = () => {
    //console.log("Run this shit: " + this.state.persons);
    var LastArray = [];
    var choiceArray = [];

    for (var x; x < LastArray.length; x++) {
      choiceArray[x] = "";
    }
    LastArray = this.state.persons;
    var db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    var linkData = {
      campaign: "content 123",
      channel: "facebook",
      feature: "dashboard",
      stage: "new user",
      tags: ["tag1", "tag2", "tag3"],
      alias: "",
      data: {
        custom_bool: true,
        custom_int: Date.now(),
        custom_string: "hello",
        $og_title: "Title",
        $og_description: "Description",
        $og_image_url: "http://lorempixel.com/400/400"
      }
    };

    var saveData = db.collection("cities").doc("SD");

    var setWithMerge = saveData.set({
      branch_id: "",
      branch_link: "",
      playerName: [],
      playerGood: [],
      playerNot: []
    });
    var finalString;

    const thisBranch = branch.init(
      "key_live_eexsGSdc8Cy3LiDMpoP49kfcFyjlxn1Q",
      function(err, data) {
        console.log("error & data" + err, data);
      }
    );

    branch.link(linkData, function(err, link) {
      console.log("Link: " + link);
      function getSecondPart(str) {
        return str.split("link/")[1];
      }

      // use the function:
      //alert("Hello: " + this.state.id + this.state.finalURL);
      var branchIdentifier = getSecondPart(link);
      db.collection("PlayerList")
        .doc(branchIdentifier)
        .set({
          name: LastArray,
          link: link,
          good: choiceArray
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    });
  };

  //  <td>{item.status}</td>
  //  <td>{item.points}</td>
  //this.onDrop.bind(this)
  // <FileUploader
  //   default
  //   accept="image/*"
  //   name="avatar"
  //   randomizeFilename
  //   storageRef={this.onDrop}
  //   onUploadStart={this.handleUploadStart}
  //   onUploadError={this.handleUploadError}
  //   onUploadSuccess={this.handleUploadSuccess}
  //   onProgress={this.handleProgress}
  // />

  // fileSelectedHandler = event => {
  //   this.setState({
  //     selectedFile: event.target.files[0]
  //   });
  // };
  //
  // fileUploadHandler = () => {
  //   console.log("Is this running: ");
  //   const fd = new FormData();
  //   fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
  //   axios
  //     .post(
  //       "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/upload",
  //       fd
  //     )
  //     .then(res => {
  //       console.log(res);
  //     });
  // };

  // <Dropzone onDrop={this.onDrop} onFileDialogCancel={this.onCancel}>
  //   <p>
  //     Drag and Drop your FanDuel/DraftKings screen shots, or click to
  //     upload.
  //   </p>
  // </Dropzone>
  // <DropzoneComponent
  //   config={componentConfig}
  //   eventHandlers={eventHandlers}
  //   djsConfig={djsConfig}
  // />
  // <img
  //   src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628469.png"
  //   alt="new"
  // />
  // handleUploadImage(ev) {
  //   ev.preventDefault();
  //
  //   const data = new FormData();
  //   data.append("file", this.uploadInput.files[0]);
  //   data.append("filename", this.fileName.value);
  //
  //   axios
  //     .post(
  //       "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/upload",
  //       data
  //     )
  //     .then(function(response) {
  //       this.setState({
  //         imageURL: `https://firebasestorage.googleapis.com/v0/b/fantasydownfinal.appspot.com/o/31ebc0f0-16c3-14f2-68b3-2442cf360c0d?alt=media&token=1b29f1ab-da43-43b3-b630-8c93396f16be`,
  //         uploadStatus: true
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  // onChange(e) {
  //   let files = e.target.files;
  //   console.log("Files: " + JSON.stringify(files));
  //
  //   // let reader = new FileReader();
  //   // reader.readAsDataURL(files[0]);
  //   //
  //   // reader.onload = () => {
  //   //   console.warn("log data ", e.target.result);
  //   //
  //   //   const url =
  //   //     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/upload";
  //   //   const formData = { persons: e.target.result };
  //   //   return post(url, formData).then(response => console.warn("result"));
  //   // };
  // }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  // handleUploadError = error => {
  //   this.setState({ isUploading: false });
  //   console.error(error);
  // };

  //handleState = () => console.log("Console log: " + this.state.myURL);

  handleUploadSuccess = filename => {
    var final;
    this.setState({ avatar: filename, progress: 100, isUploading: true });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(downloadURL => {
        //  console.log("File available at: " + this.state.finalURL);
        //  this.handleState(downloadURL);
        //  final = downloadURL;
        //  console.log("URL: " + final);
        //  this.setState({});
        axios
          .post(
            `http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup`,
            {
              final: downloadURL
            }
          )
          .then(response => {
            console.log("Response: " + response.data);
            var finalData = response.data;
            console.log("Final Data: " + finalData);
            this.setState(
              {
                persons: finalData,
                imageURL: downloadURL
              },
              () => {
                this.runThisShit();
              }
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      });
  };
  handleResponse = data => {
    console.log(data.profile.picture.data.url);
    this.setState({
      facebookURL: data.profile.picture.data.url
    });
    console.log("Facebook Url: " + this.state.facebookURL);
  };

  handleError = error => {
    this.setState({ error });
  };

  responseFacebook = response => {
    this.setState(
      {
        id: response.id
      },
      () => {
        console.log("State: " + this.state.id);
      }
    );
  };
  countTallys = (value, person) => {
    console.log("Tally: " + person + " " + value);
    if (value === "good") {
      console.log("Good was chosen");
    } else {
      console.log("Bad was chosen");
    }
  };
  handleChange = response => {
    console.log("Handle Change: " + response);
  };

  /*

            <FacebookLogin
              appId="394128604467804"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
            />
  */
  render() {
    // var componentConfig = {
    //   iconFiletypes: [".jpg", ".png", ".gif"],
    //   showFiletypeIcon: true,
    //   postUrl:
    //     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/23"
    // };

    return (
      <div className="App">
        <header className="App-header">
          <form>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && <img src={this.state.avatarURL} />}
            <label
              style={{
                backgroundColor: "lightGreen",
                color: "white",
                padding: 10,
                borderRadius: 4,
                pointer: "cursor"
              }}
            >
              Upload your DraftKings or FanDuel Screen Shot
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
          </form>
          <FacebookProvider appId="394128604467804">
            <LoginButton
              scope="name,email,picture"
              onCompleted={this.handleResponse}
              onError={this.handleError}
            >
              <span>Login via Facebook</span>
            </LoginButton>
          </FacebookProvider>
          <FacebookProvider appId="394128604467804">
            <Status>{({ loading, status }) => <div />}</Status>
          </FacebookProvider>
          <img src={this.state.facebookURL} />

          <Accordion>
            {this.state.persons.map((row, i) => (
              <AccordionItem>
                <AccordionItemTitle>
                  <form className="App-accordion">
                    <input
                      type="radio"
                      name={this.state.persons[i]}
                      onChange={() =>
                        this.countTallys("good", this.state.persons[i])
                      }
                    />
                    <input
                      type="radio"
                      name={this.state.persons[i]}
                      onChange={() =>
                        this.countTallys("bad", this.state.persons[i])
                      }
                    />
                    <RadioGroup
                      onChange={value =>
                        this.countTallys(value, this.state.persons[i])
                      }
                      horizontal
                    >
                      <RadioButtonComponent
                        label={this.state.persons[i]}
                        name={this.state.persons[i]}
                        labelPosition="Before"
                        value="true"
                      />
                      <RadioButtonComponent
                        label=""
                        name={this.state.persons[i]}
                        labelPosition="After"
                        value="bad"
                      />
                    </RadioGroup>
                  </form>
                </AccordionItemTitle>
              </AccordionItem>
            ))}
          </Accordion>
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
}

// <AccordionItemBody>
//   <button>Replace</button>
// </AccordionItemBody>

// render() {
//   let allItemRows = [];
// axios
//   .get(
//     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
//   )
//   .then(function(response) {
//     console.log("Is this running: " + JSON.stringify(response));
//     realData = JSON.stringify(response);
//     realData.data.forEach(item => {
//       const perItemRows = this.renderItem(item);
//       allItemRows = allItemRows.concat(perItemRows);
//     });
//   })
//   .catch(function(error) {
//     console.log("Is this: " + error);
//   });
//
//   return <Accordion>{allItemRows}</Accordion>;
// }

/*
<ul>
  {this.state.files.map(f => (
    <li key={f.name}>
      {f.name} - {f.size} bytes
    </li>
  ))}
</ul>

*/

// renderItem(item) {
//   const clickCallback = () => this.handleRowClick(item.id);
//   const closeClickCallBack = () => this.handleRadioClick(item.id);
//   const itemRows = [
//     <tr key={"row-data-" + item.id}>
//       <td>
//         <RadioButtonComponent onClick={closeClickCallBack} name={item.id} />
//       </td>
//       <td>{item.name}</td>
//       <td>
//         <RadioButtonComponent onClick={clickCallback} name={item.id} />
//       </td>
//     </tr>
//   ];
//
//   if (this.state.expandedRows.includes(item.id)) {
//     itemRows.push(
//       <tr key={"row-expanded-" + item.id}>
//         <td>{item.points}</td>
//       </tr>
//     );
//   }
//
//   return itemRows;
// }

// render() {
//   let allItemRows = [];
// axios
//   .get(
//     "http://localhost:5000/fantasy-down-dev/us-central1/web/detect/lineup/2"
//   )
//   .then(function(response) {
//     console.log("Is this running: " + JSON.stringify(response));
//     realData = JSON.stringify(response);
//     realData.data.forEach(item => {
//       const perItemRows = this.renderItem(item);
//       allItemRows = allItemRows.concat(perItemRows);
//     });
//   })
//   .catch(function(error) {
//     console.log("Is this: " + error);
//   });
//
//   return <table>{allItemRows}</table>;
// }
export default App;
