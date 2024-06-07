import React from 'react'
import { Card } from '../ui/card'
import { AddMoreIcon } from '../svgRender'

const CreateNewCard = () => {

    return (
        <Card className="main-card w-full h-28 p-4 flex flex-col justify-center items-center cursor-pointer">
            <AddMoreIcon />
        </Card>
    )
}

export default CreateNewCard