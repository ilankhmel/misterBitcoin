import { MovesPreview } from "./MovesPreview"

export function MovesList({title, movesList}) {

    return (
        <section className="moves-list">
           <h3>{title}</h3>
           {movesList.length ?
            movesList.map(move =>     
            <MovesPreview key={move.at} move={move}/>):
            <div>No moves yet.</div>
        }
        </section>
    )
}
