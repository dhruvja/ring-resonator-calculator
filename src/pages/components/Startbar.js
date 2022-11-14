import React from 'react'
import {Segment,Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function Startbar(props) {

    const handleItemClick = () => {
        console.log("Item Clicked")
    }

    return (
        <div>
            <Segment inverted>
                <Menu inverted pointing secondary>
                <Menu.Item header>Ring Resonator</Menu.Item>
                </Menu>
            </Segment>
        </div>
    )
}

export default Startbar
