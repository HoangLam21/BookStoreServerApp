import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Rating = ({ value }) => {
    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((star) => (
            <i
                key={star}
                className={
                    value >= star
                        ? 'fa fa-star text-[#513820]' 
                        : value >= star - 0.5
                        ? 'fa fa-star-half-o text-[#513820]'
                        : 'fa fa-star-o text-[#513820]'
                }
            ></i>
        ));
    };

    return (
        <div className="flat-star style-1 flex">
            {renderStars()}
        </div>
    );
};

export default Rating;
