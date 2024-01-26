import React from 'react'

function useRendered() {
  const [rendered, setRendered] = React.useState(false)

    React.useEffect(() => {
        setRendered(true)
    }, [])

    return rendered
}

export default useRendered