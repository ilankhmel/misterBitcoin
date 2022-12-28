import { contactService } from "../../services/contact.service";

export function loadContacts(){

    return async (dispatch, getState) => {
        try{
            const filterBy = getState().contactModule.filterBy  
            const contacts = await contactService.getContacts(filterBy)
            dispatch({type: 'SET_CONTACTS', contacts})
        }catch(err){
            console.log(err);
        }
    }
}

export function removeContact(contactId){

    return async (dispatch) => {
        try{
            await contactService.deleteContact(contactId)
            dispatch({type: 'REMOVE_CONTACT', contactId})
        }catch(err){
            console.log(err);
        }
    }
}
// export function setContact(contactId){
//     return async (dispatch) => {
//         try{
//             const contact = await contactService.getContactById(contactId)
//             dispatch({type: 'SET_CONTACT', contact})
//         }catch(err){
//             console.log(err);
//         }
//     }
// }

export function setFilterBy(filterBy){

    return (dispatch) => {
        try{
          dispatch({type: 'SET_FILTER_BY', filterBy: {...filterBy}})
        }catch(err){
            console.log(err);
        }
    }
}