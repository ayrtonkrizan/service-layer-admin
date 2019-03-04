var rp = require('request-promise');
const interval = 1000 * 60  * 25; //25m;
var config = {};
var session;
var server;
var urls = {};

function api(c){
    config = c;
    server = c.server;
    
    urls = {
        Login:server+"Login",
        Logout: server+"Logout",
        Items: server+"Items",
        BP:server+"BusinessPartners",
        
        NFS:server+"Invoices",
        PV:server+"Orders",
        Adto: server+"DownPayments",
        CR:  server+"IncomingPayments",

        NFE: server+"PurchaseInvoices",
        PC: server+"PurchaseOrders",
        CP: server+"VendorPayments",

        LCM:server+"JournalEntries"
    }

    const timer = setInterval(loginSL, interval); // Relogar a service Layer a cada {interval} tempo;
    loginSL();
}

function loginSL(){
    let loginData = {UserName: config.sapUser, Password: config.sapPassword, CompanyDB: config.database};

    callWeb('POST', urls["Login"], loginData)
        .then((body) =>{
            console.log("Service Layer Connected!!!");
            console.log(body);
            
            session = JSON.parse(body).SessionId;
        })
        .catch(err=>{
            console.error('Login', err);
        });
}

async function callWeb(method, url, body) {
    let options = {
        method: method,
        "rejectUnauthorized": false, 
        uri: url,
        headers: 
        { 
            'content-type': 'application/json',
            'accept': 'application/json',
            Cookie: "B1SESSION="+session,
        }
    };

    if(body)
        options.body = JSON.stringify(body);

    const res = await rp(options);

    return res;
}

api.prototype.getPN = async cardCode => {
    return await callWeb('GET', `${urls["BP"]}('${cardCode}')`);
}

api.prototype.insertPN = async json => {
    return await callWeb('POST', urls["BP"], json);
}

api.prototype.updatePN = async json => {
    let CardCode = json["CardCode"];
    delete json.CardCode;
    
    //console.log(options);
    return await callWeb('PATCH', `${urls["BP"]}('${CardCode}')`, json);
}

api.prototype.getItem = async itemCode => {
    return await callWeb('GET', `${urls["Items"]}('${itemCode}')`);
}

api.prototype.insertItem = async json => {
    return await callWeb('POST', urls["Items"], json);
}

api.prototype.updateItem = async json => {
    let ItemCode = json["ItemCode"];
    delete json.ItemCode;
    
    //console.log(options);
    return await callWeb('PATCH', `${urls["Items"]}('${ItemCode}')`, json);
}

api.prototype.getPV = async docEntry => {
    return await callWeb('GET', `${urls["PV"]}(${docEntry})`);
}

api.prototype.insertPV = async json => {
    return await callWeb('POST', urls["PV"], json);
}

api.prototype.cancelPV = async docEntry => {
    return await callWeb('POST', `${urls["PV"]}(${docEntry})/Cancel`);
}

api.prototype.getNFS = async docEntry => {
    return await callWeb('GET', `${urls["NFS"]}(${docEntry})`);
}

api.prototype.insertNFS = async json => {
    return await callWeb('POST', urls["NFS"], json);
}

api.prototype.cancelNFS = async docEntry => {
    return await callWeb('POST', `${urls["NFS"]}(${docEntry})/Cancel`);
}

api.prototype.getAdto = async docEntry => {
    return await callWeb('GET', `${urls["Adto"]}(${docEntry})`);
}

api.prototype.insertAdto = async json => {
    return await callWeb('POST', urls["Adto"], json);   
}

api.prototype.cancelAdto = async docEntry => {
    return await callWeb('POST', `${urls["Adto"]}(${docEntry})/Cancel`);
}

api.prototype.getCR = async docEntry => {
    return await callWeb('GET', `${urls["CR"]}(${docEntry})`);
}

api.prototype.insertCR = async json => {
    return await callWeb('POST', urls["CR"], json);    
}

api.prototype.cancelCR = async docEntry => {
    return await callWeb('POST', `${urls["CR"]}(${docEntry})/Cancel`);
}

api.prototype.getPC = async docEntry => {
    return await callWeb('GET', `${urls["PC"]}(${docEntry})`);
}

api.prototype.insertPC = async json => {
    return await callWeb('POST', urls["PC"], json);
}

api.prototype.cancelPC = async docEntry => {
    return await callWeb('POST', `${urls["PC"]}(${docEntry})/Cancel`);
}

api.prototype.getNFE = async docEntry => {
    return await callWeb('GET', `${urls["NFE"]}(${docEntry})`);
}

api.prototype.insertNFE = async json => {
    return await callWeb('POST', urls["NFE"], json);
}

api.prototype.cancelNFE = async docEntry => {
    return await callWeb('POST', `${urls["NFE"]}(${docEntry})/Cancel`);
}

api.prototype.getCP = async docEntry => {
    return await callWeb('GET', `${urls["CP"]}(${docEntry})`);
}

api.prototype.insertCP = async json => {
    return await callWeb('POST', urls["CP"], json);
}

api.prototype.cancelCP = async docEntry => {
    return await callWeb('POST', `${urls["CP"]}(${docEntry})/Cancel`);
}

api.prototype.getLCM = async transId => {
    return await callWeb('GET', `${urls["LCM"]}(${transId})`);
}

api.prototype.insertLCM = async json => {
    return await callWeb('POST', urls["LCM"], json);
}

module.exports = api;