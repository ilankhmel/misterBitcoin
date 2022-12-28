const INITIAL_STATE = {
    contacts: null,
    selectedContact: null,
    filterBy: {
        term: '',
    }
}

export function contactReducer(state = INITIAL_STATE, action){
     switch (action.type) {
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.contact]
            }
        case 'REMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.contactId)
            }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.contact ? action.contact : contact)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: {...action.filterBy}
            }
        // case 'SET_CONTACT':
        //     return {
        //         ...state,
        //         selectedContact: {...action.contact}
        //     }
            
     
        default:
            return state
     }
}