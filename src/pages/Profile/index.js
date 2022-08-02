import React from 'react';
import videos from '~/assets/videos';

export default function Profile() {
    return (
        <div className="">
            <video
                src={videos.video1}
                autoPlay
                controls
                muted="muted"
                width={400}
                height={400}
            />
        </div>
    );
}
