import ContactPreview from '../cmps/ContactPreview'

export function ContactList({contacts}) {
    
  return (
    <section className="contact-list ">
        {contacts.map(contact =>
            <ContactPreview
                key={contact._id}
                contact={contact}
            />
        )}
    </section>

  )
}
