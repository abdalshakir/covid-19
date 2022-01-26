import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoCard({ title, cases, total }) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography color='textSecondary'>{title}</Typography>
                    <Typography color='textSecondary' variant='h4'>{cases}</Typography>
                    <Typography color='textSecondary'>{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoCard

