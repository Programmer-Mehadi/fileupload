import React from 'react';

const Loading = () => {
    return (
        <div className='flex items-center justify-center'>
            <progress className="progress mx-auto w-56 mt-14"></progress>
        </div>
    );
};

export default Loading;