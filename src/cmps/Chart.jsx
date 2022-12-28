import React from 'react';
import { Sparklines, SparklinesLine  } from 'react-sparklines';

export function Chart({name, data, desc, color}) {
  return (
    <section className="chart-container">
        <h2>{name}</h2>
        <Sparklines className="chart" data={data} limit={data.length} width={100} height={20} margin={5}>
            <SparklinesLine color={color} />
        </Sparklines>
        <p>{desc}</p>
    </section>
  )
}
