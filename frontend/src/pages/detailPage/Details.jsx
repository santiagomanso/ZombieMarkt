import { useParams } from 'react-router-dom'

const Details = () => {
  const { id } = useParams()
  return (
    <main>
      <h1>Details for: {id}</h1>
    </main>
  )
}

export default Details
