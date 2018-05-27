import React from 'react';
import style from 'styles/loading';

const Loading = () => {
    return (
        <div className="loading">
            <span> Preparing everything for you </span>
            <style jsx>{style}</style>
        </div>
    );
};

export default Loading;
