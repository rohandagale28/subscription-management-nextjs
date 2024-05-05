import React from 'react'
import data from './data'
import MenuButton from './menu-button'

export default function MenuNavigation() {

    return (
        <React.Fragment>
            {data.map(({ id, link, title, component }) => {
                return (
                    <React.Fragment key={id}>
                        <MenuButton title={title} link={link} component={component} />
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}
