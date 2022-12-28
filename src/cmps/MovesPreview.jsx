
export function MovesPreview({move}) {
    return (
        <section className="moves-preview" key={move.at}>
            <hr />
            <p>To: {move.to}</p>
            <p>At: {new Date(move.at).toLocaleString()}</p>
            <p>Amount: {move.amount}</p>
        </section>)

}
