<img src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/addon/icon128.png" align="right">

Salesforce Inspector - WIP - Not ready for use
===========================
Safari extension to add a metadata layout on top of the standard Salesforce UI to improve the productivity and joy of Salesforce configuration, development, and integration work.


Installation
------------

In progress

Features
-----
* Quickly view field information directly from a record detail page, edit page or Visualforce page.
* Quickly view and edit all data for a record, even data that is not on the page layout.
* Perform quick one-off data exports and imports directly from within Salesforce. Data can be easily copied to and from Excel. No need to log in again when you are already logged in with your browser.
* View current limits consumption
* Simple access to user record details incl. simpler access to "login as". E.g. when hopping between test users.
* And more...

<img alt="Inspector menu" src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/docs/screenshots/1.png" height="100">
<img alt="Show field metadata" src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/docs/screenshots/2.png" height="100">
<img alt="Show all data for record" src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/docs/screenshots/3.png" height="100">
<img alt="Data exporter" src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/docs/screenshots/4.png" height="100">
<img alt="Data importer" src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/docs/screenshots/5.png" height="100">
<img alt="Monitor limits" src="https://raw.githubusercontent.com/sorenkrabbe/Chrome-Salesforce-inspector/master/docs/screenshots/6.png" height="100">

Security and Privacy
-----
The Salesforce Inspector browser extension/plugin communicates directly between the user's web browser and the Salesforce servers. No data is sent to other parties and no data is persisted outside of Salesforce servers after the user leaves the Salesforce Inspector pages.
The Inspector communicates via the official Salesforce webservice APIs on behalf of the currently logged in user. This means the Inspector will be capable of accessing nothing but the data and features the user has been granted access to in Salesforce.

All Salesforce API calls from the Inspector re-uses the access token/session used by the browser to access Salesforce. To acquire this access token the Salesforce Inspector requires permission to read browser cookie information for Salesforce domains.

To validate the accuracy of this description, inspect the source code, monitor the network traffic in your browser or take my word.

Troubleshooting
-----
* If Salesforce Inspector is not available after installation, the most likely issue is that your browser is not up to date. See [instructions for Google Chrome](https://productforums.google.com/forum/#!topic/chrome/YK1-o4KoSjc).
* When you enable the My Domain feature in Salesforce, Salesforce Inspector may not work until you have restarted your browser (or until you have deleted the "sid" cookie for the old Salesforce domain by other means).

Development
-----

1. Install Xcode
2. Clone the Project
3. Open Safari and choose Develop > Allow Unsigned Extensions.


Release
-------
Version number must be manually incremented in [addon/manifest-template.json](addon/manifest-template.json) file


Design Principles
-----
(we don't live up to all of them. pull requests welcome)
* Stay completely inactive until the user explicitly interacts with it. The tool has the potential to break Salesforce functionality when used, since we rely on monkey patching and internal APIs. We must ensure that you cannot break Salesforce just by having the tool installed or enabled. For example, we won't fix the setup search placeholder bug.
* For manual ad-hoc tasks only. The tool is designed to help administrators and developers interact with Salesforce in the browser. It is after all a browser add-on. Enabling automation is a non-goal.
* User experience is important. Features should be intuitive and discoverable, but efficiency is more important than discoverability. More advanced features should be hidden, and primary features should be central. Performance is key.
* Automatically provide as much contextual information as possible, without overwhelming the user. Information that is presented automatically when needed is a lot more useful than information you need to explicitly request. For example, provide autocomplete for every input.
* Provide easy access to the raw Salesforce API. Enhance the interaction in a way that does not break the core use case, if our enhancements fails. For example, ensure we can display the result of a data export even if we cannot parse the SOQL query.
* It is fine to implement features that are already available in the core Salesforce UI, if we can make it easier, smarter or faster.
* Ensure that it works for as many users as possible. (for system administrators, for standard users, with person accounts, with multi currency, with large data volumes, with professional edition, on a slow network etc.)
* Be conservative about the number and complexity of Salesforce API requests we make, but don't sacrifice the other principles to do so.
* Focus on system administrators, developers and integrators.

About
-----
Forked from the work of Søren Krabbe and Jesper Kristensen - https://github.com/sorenkrabbe/Chrome-Salesforce-inspector

License
-----
MIT
