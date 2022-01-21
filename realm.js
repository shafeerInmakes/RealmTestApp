import Realm from 'realm';

class Contact extends Realm.Object { }

Contact.schema = {
    name: "Contact",
    properties: {
        recordID: 'int',
        name: 'string',
        phoneNumber: 'string'
    },
    primaryKey: "recordID",
};
let realm = new Realm({ schema: [Contact], schemaVersion: 4 });

let getAllContacts = () => {
    return realm.objects("Contact");
}

let addContact = (_recordID, _name, _phoneNumber) => {
    realm.write(() => {
        const contact = realm.create("Contact", {
            recordID: _recordID,
            name: _name,
            phoneNumber: _phoneNumber
        });
    })
}

let deleteAllContact = () => {
    realm.write(() => {
        realm.deleteAll()
    })
}
let deleteContact = (recordID) => {
    realm.write(() => {
        realm.delete(
            realm.objects('Contact').filter(contObj => contObj.recordID == recordID)
        )
    })
          realm.write(() => {
            realm.objects('Contact').map((contObj, index) => contObj.recordID = (index + 1));
});
}
export default realm;

export {
    getAllContacts, addContact, deleteAllContact, deleteContact
}