/* global React ReactDOM */
import {sfConn, apiVersion} from "./inspector.js";
import {getAllFieldSetupLinks} from "./setup-links.js";

console.log("Hello World!", browser);

let h = React.createElement;

// what is this
{
  parent.postMessage({insextInitRequest: true}, "*");
  addEventListener("message", function initResponseHandler(e) {
    if (e.source == parent && e.data.insextInitResponse) {
      removeEventListener("message", initResponseHandler);
      init(e.data);
    }
  });
}

function closePopup() {
  parent.postMessage({insextClosePopup: true}, "*");
}

function init({sfHost, inDevConsole, inLightning, inInspector}) {
  let addonVersion = browser.runtime.getManifest().version;
  
    console.log(addonVersion, browser);

  sfConn.getSession(sfHost).then(() => {

    ReactDOM.render(h(App, {
      sfHost,
      inDevConsole,
      inLightning,
      inInspector,
      addonVersion,
    }), document.getElementById("root"));

  });
}
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInSetup: false,
      contextUrl: null
    };
    this.onContextUrlMessage = this.onContextUrlMessage.bind(this);
    this.onShortcutKey = this.onShortcutKey.bind(this);
  }
  onContextUrlMessage(e) {
    if (e.source == parent && e.data.insextUpdateRecordId) {
      let {locationHref} = e.data;
      this.setState({
        isInSetup: locationHref.includes("/lightning/setup/"),
        contextUrl: locationHref
      });
    }
  }

  onShortcutKey(e) {
    if (e.key == "m") {
      e.preventDefault();
      this.refs.showAllDataBox.clickShowDetailsBtn();
    }
    if (e.key == "a") {
      e.preventDefault();
      this.refs.showAllDataBox.clickAllDataBtn();
    }
    if (e.key == "e") {
      e.preventDefault();
      this.refs.dataExportBtn.click();
    }
    if (e.key == "i") {
      e.preventDefault();
      this.refs.dataImportBtn.click();
    }
    if (e.key == "l") {
      e.preventDefault();
      this.refs.limitsBtn.click();
    }
    if (e.key == "d") {
      e.preventDefault();
      this.refs.metaRetrieveBtn.click();
    }
    if (e.key == "x") {
      e.preventDefault();
      this.refs.apiExploreBtn.click();
    }
    if (e.key == "h" && this.refs.homeBtn) {
      this.refs.homeBtn.click();
    }
    //TODO: Add shortcut for "u to go to user aspect"
  }
  componentDidMount() {
    addEventListener("message", this.onContextUrlMessage);
    addEventListener("keydown", this.onShortcutKey);
    parent.postMessage({insextLoaded: true}, "*");
  }
  componentWillUnmount() {
    removeEventListener("message", this.onContextUrlMessage);
    removeEventListener("keydown", this.onShortcutKey);
  }
  render() {
    let {
      sfHost,
      inDevConsole,
      inLightning,
      inInspector,
      addonVersion,
    } = this.props;
    let {isInSetup, contextUrl} = this.state;
    let hostArg = new URLSearchParams();
    hostArg.set("host", sfHost);
    let linkTarget = inDevConsole ? "_blank" : "_top";
    return (
      h("div", {},
        h("div", {className: "header"},
          h("div", {className: "header-icon"},
            h("svg", {viewBox: "0 0 24 24"},
              h("path", {d: `
                M11 9c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z
                m1 5.8c0 .2-.1.3-.3.3h-1.4c-.2 0-.3-.1-.3-.3v-4.6c0-.2.1-.3.3-.3h1.4c.2.0.3.1.3.3z
                M11 3.8c-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2s7.2-3.2 7.2-7.2s-3.2-7.2-7.2-7.2z
                m0 12.5c-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3s5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3z
                M 17.6 15.9c-.2-.2-.3-.2-.5 0l-1.4 1.4c-.2.2-.2.3 0 .5l4 4c.2.2.3.2.5 0l1.4-1.4c.2-.2.2-.3 0-.5z
                `})
            )
          ),
          "Salesforce inspector"
        )
//        h("div", {className: "main"},
//          h(AllDataBox, {ref: "showAllDataBox", sfHost, showDetailsSupported: !inLightning && !inInspector, linkTarget, contextUrl}),
//          h("div", {className: "global-box"},
//            h("a", {ref: "dataExportBtn", href: "data-export.html?" + hostArg, target: linkTarget, className: "button"}, "Data ", h("u", {}, "E"), "xport"),
//            h("a", {ref: "dataImportBtn", href: "data-import.html?" + hostArg, target: linkTarget, className: "button"}, "Data ", h("u", {}, "I"), "mport"),
//            h("a", {ref: "limitsBtn", href: "limits.html?" + hostArg, target: linkTarget, className: "button"}, "Org ", h("u", {}, "L"), "imits"),
//            // Advanded features should be put below this line, and the layout adjusted so they are below the fold
//            h("a", {ref: "metaRetrieveBtn", href: "metadata-retrieve.html?" + hostArg, target: linkTarget, className: "button"}, h("u", {}, "D"), "ownload Metadata"),
//            h("a", {ref: "apiExploreBtn", href: "explore-api.html?" + hostArg, target: linkTarget, className: "button"}, "E", h("u", {}, "x"), "plore API"),
//            // Workaround for in Lightning the link to Setup always opens a new tab, and the link back cannot open a new tab.
//            inLightning && isInSetup && h("a", {ref: "homeBtn", href: `https://${sfHost}/lightning/page/home`, title: "You can choose if you want to open in a new tab or not", target: linkTarget, className: "button"}, "Salesforce ", h("u", {}, "H"), "ome"),
//            inLightning && !isInSetup && h("a", {ref: "homeBtn", href: `https://${sfHost}/lightning/setup/SetupOneHome/home?setupApp=all`, title: "You can choose if you want to open in a new tab or not", target: linkTarget, className: "button"}, "Setup ", h("u", {}, "H"), "ome"),
//          )
//        ),
//        h("div", {className: "footer"},
//          h("div", {className: "meta"},
//            h("div", {className: "version"},
//              "(",
//              h("a", {href: "https://github.com/sorenkrabbe/Chrome-Salesforce-inspector/blob/master/CHANGES.md"}, "v" + addonVersion),
//              " / " + apiVersion + ")",
//            ),
//            h("div", {className: "tip"}, "[ctrl+alt+i] to open"),
//            h("a", {className: "about", href: "https://github.com/sorenkrabbe/Chrome-Salesforce-inspector", target: linkTarget}, "About")
//          ),
//        )
      )
    );
  }
}
