import React, { useContext } from 'react'
import ComponentF from './ComponentF';
import { UserContext, ChannelContext } from './Master'

function ComponentE() {

    const user = useContext(UserContext)
    const channel = useContext(ChannelContext)

    return (
        <div>
            <ComponentF />
        </div>
    )
}

export default ComponentE
