export let apiVersion = "56.0";

export let sfConn = {
    
    async getSession(sfHost) {
        let message = await new Promise(resolve =>
                                        browser.runtime.sendMessage({message: "getSession", sfHost}, resolve));
        if (message) {
            consol.log(message);
            this.instanceHostname = message.hostname;
            this.sessionId = message.key;
        }
    },
}
