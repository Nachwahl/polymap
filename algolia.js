
const algoliasearch = require('algoliasearch');
let index;

const init = () => {
    const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPID, process.env.ALGOLIA_APIKEY_ADMIN);
    index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEXNAME);
}
const getIndex = () => {
    if(!index) {
        init();
    }
    return index;
}
module.exports = {getIndex}
