import React from 'react'
import data from './data'
import MenuButton from './menu-button'

export default function SideMenuNavigation() {

    return (
        <ul className='w-full flex flex-col justify-between items-center'>
            {data.map(({ id, link, title, component }) => {
                return (
                    <React.Fragment key={id}>
                        <MenuButton title={title} link={link} component={component} />
                    </React.Fragment>
                )
            })}
        </ul>
    )
}
