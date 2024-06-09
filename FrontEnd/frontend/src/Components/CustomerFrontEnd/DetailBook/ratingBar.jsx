const RatingBar = ({ value, onChange }) => {
    const handleClick = (newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((star) => (
            <i
                key={star}
                className={
                    value >= star
                        ? 'fa fa-star text-[#513820] cursor-pointer'
                        : value >= star - 0.5
                        ? 'fa fa-star-half-o text-[#513820] cursor-pointer'
                        : 'fa fa-star-o text-[#513820] cursor-pointer'
                }
                onClick={() => handleClick(star)}
            ></i>
        ));
    };

    return (
        <div className="flat-star style-1 flex">
            {renderStars()}
        </div>
    );
};

export default RatingBar;