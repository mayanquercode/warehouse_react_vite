import { Grid, type GridWrap } from "@mui/material"
import type { GridProps } from "@mui/material"
import { Children } from "react"

type Props = {
    children: React.ReactNode[]
    sizeContainer?: number
    spacingContainer?: number
    sizeItem?: number
    wrap?: GridProps['wrap']
}

function BoxGrid({
    children,
    sizeItem = 12,
    sizeContainer = 12,
    spacingContainer = 2,
    wrap = 'nowrap'
}: Props) {
    return (
        <Grid container spacing={spacingContainer} size={sizeContainer} wrap={wrap}>
            {Children.toArray(children).map((item, index) => (
                <Grid key={index} size={sizeItem}>
                    {item}
                </Grid>
            ))}
        </Grid>
    )
}

export default BoxGrid