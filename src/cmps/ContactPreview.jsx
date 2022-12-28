import{ Link } from 'react-router-dom'
export default function ContactPreview({contact}) {
  return (
    <Link to={`/contact/${contact._id}`} className="contact-preview" >
        <img className="contact-img" src={"https://robohash.org/set_set5/" + contact._id} alt="" />
        <h2 className="contact-name">Name: {contact.name}</h2>
    </Link>
  )
}
