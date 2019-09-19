interface INameToValueMap
{
    [key: string]: any;
}
export function generatedata(rowscount?: number, hasNullValues?: boolean): any[] {
    let data = new Array();
    if (rowscount == undefined) rowscount = 100;
    var keys = Object.keys(localStorage); 


    for (let i = 0; i < rowscount; i++) {
        let row: INameToValueMap = {};
        let value = JSON.parse(localStorage.getItem(keys[i])!);

        row['no'] = i+1;
        row['address'] = value.address;
        row['UncomperssedPub'] = value.uncompressedPubkey
        row['ComperssedPub'] = value.compressedPubkey
        row['pri'] = value.privateKey;
        row['isEnc'] = value.isEncrypted;

        let date = new Date();
        date.setFullYear(2019, Math.floor(Math.random() * 11), Math.floor(Math.random() * 27));
        date.setHours(0, 0, 0, 0);
        row['date'] = date;
       
        data[i] = row;
    }

    return data;
}


export function generateData(rowscount?: number): any[] {
    return generatedata(rowscount);
}