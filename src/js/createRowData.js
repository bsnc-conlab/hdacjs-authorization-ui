
function createRow(index) {
  var keys = Object.keys(localStorage); 
  
  if (localStorage.getItem(keys[index]) == ""){
    return {};
  }
  
  var value = JSON.parse(localStorage.getItem(keys[index]));
  // console.log(value);
  var isEncrypted = 'false';
  if (value.isEncrypted) {
    isEncrypted = 'true';
  }
  return {
    no: index+1,
    address: value.address,
    uncompressed: value.uncompressedPubkey,
    compressed: value.compressedPubkey,
    privateKey: value.privateKey,
    isEncrypted: isEncrypted
  };
}


export default function createRowData(count) {
  var result = [...Array(count).keys()].map(i => createRow(i));
  return result;
}
